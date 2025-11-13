(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");
    const form = document.getElementById("edit-profile-form");
    const messageArea = document.getElementById("message-area");
    const profilePicPreview = document.getElementById("edit-profile-pic-preview");
    const fileInput = document.getElementById("file");
    const bannerColorInput = document.getElementById("bannerColor");
    const bannerPreview = document.getElementById("profile-banner");

    const loggedInUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token"); // ✅ JWT salvo no login

    if (!usernameFromUrl) {
      console.error("Nome de usuário não especificado para edição.");
      window.location.href = "index.html";
      return;
    }

    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    async function loadUserProfile(username) {
      try {
        const response = await fetch(
          `https://incognidex-backend.onrender.com/api/profile/${username}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`, // ✅ autenticação correta
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Perfil não encontrado ou acesso negado (Status: ${response.status})`);
        }

        const user = await response.json();

        // Preenche campos
        document.getElementById("nomeCompleto").value = user.nome_completo || user.fullName || "";
        document.getElementById("biografia").value = user.biografia || "";
        document.getElementById("interessesAcademicos").value = user.interesses_academicos || "";
        profilePicPreview.src = user.url_foto || "https://via.placeholder.com/150";

        const color = user.bannerColor || user.banner_color || "";
        if (bannerColorInput && color) bannerColorInput.value = color;
        if (bannerPreview && color) bannerPreview.style.background = color;

      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados para edição. ${error.message}</p>`;
      }
    }

    // Verifica se o usuário logado pode editar o perfil
    if (!loggedInUsername || loggedInUsername !== usernameFromUrl) {
      alert("Você não tem permissão para editar este perfil.");
      window.location.href = `user-profile.html?username=${usernameFromUrl}`;
      return;
    }

    // Carrega dados
    loadUserProfile(usernameFromUrl);

    // Atualiza preview da cor
    if (bannerColorInput && bannerPreview) {
      bannerColorInput.addEventListener("input", (e) => {
        bannerPreview.style.background = e.target.value;
      });
    }

    // Preview da foto
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) profilePicPreview.src = URL.createObjectURL(file);
      });
    }

    // Envio do formulário
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        if (fileInput.files.length === 0) formData.delete("file");

        try {
          messageArea.innerHTML = `<p style="color: orange;">Salvando alterações...</p>`;

          const response = await fetch(
            `https://incognidex-backend.onrender.com/api/profile/edit`,
            {
              method: "PUT",
              headers: {
                "Authorization": `Bearer ${token}`, // ✅ usa o JWT no PUT também
              },
              body: formData,
            }
          );

          if (response.ok) {
            const updatedUser = await response.json();
            messageArea.innerHTML = `<p style="color: green; font-weight: bold;">✅ Perfil atualizado com sucesso!</p>`;

            setTimeout(() => {
              window.location.href = `user-profile.html?username=${updatedUser.username}`;
            }, 1500);
          } else {
            const errorText = await response.text();
            let errorMessage = "Erro ao salvar o perfil. Verifique os dados.";
            if (response.status === 403)
              errorMessage = "Erro de permissão. Faça login novamente.";
            messageArea.innerHTML = `<p style="color: red;">❌ ${errorMessage}</p>`;
            console.error("Erro na resposta do servidor:", response.status, errorText);
          }

        } catch (error) {
          console.error("Erro na requisição de atualização:", error);
          messageArea.innerHTML = `<p style="color: red;">Erro de conexão com o servidor.</p>`;
        }
      });
    }

    document.getElementById("cancelBtn").addEventListener("click", function () {
      window.location.href = `user-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
    });
  });
})();
