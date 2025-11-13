(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ edit-profile.js carregado.");

    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");
    const form = document.getElementById("edit-profile-form");
    const messageArea = document.getElementById("message-area");
    const profilePicPreview = document.getElementById("edit-profile-pic-preview");
    const fileInput = document.getElementById("file");
    const bannerColorInput = document.getElementById("bannerColor");
    const bannerPreview = document.getElementById("profile-banner");

    const loggedInUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!usernameFromUrl) {
      console.error("❌ Nome de usuário não especificado para edição.");
      window.location.href = "index.html";
      return;
    }

    if (!loggedInUsername || !token) {
      console.error("❌ Usuário não autenticado ou token ausente.");
      alert("Sua sessão expirou. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    if (loggedInUsername !== usernameFromUrl) {
      alert("⚠️ Você não tem permissão para editar este perfil.");
      window.location.href = `user-profile.html?username=${usernameFromUrl}`;
      return;
    }

    // 🔹 Carrega dados do perfil para edição
    async function loadUserProfile(username) {
      try {
        const response = await fetch(
          `https://incognidex-backend.onrender.com/api/profile/${username}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "X-User-Username": loggedInUsername
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Perfil não encontrado ou acesso negado (Status: ${response.status})`);
        }

        const user = await response.json();
        console.log("🟢 Perfil carregado:", user);

        // Preenche campos
        document.getElementById("username").value = user.username || "";
        document.getElementById("nomeCompleto").value = user.nome_completo || user.fullName || "";
        document.getElementById("biografia").value = user.biografia || "";
        document.getElementById("interessesAcademicos").value = user.interesses_academicos || "";
        profilePicPreview.src = user.url_foto || "https://via.placeholder.com/150";

        const color = user.bannerColor || user.banner_color || "";
        if (bannerColorInput && color) bannerColorInput.value = color;
        if (bannerPreview && color) bannerPreview.style.background = color;

      } catch (error) {
        console.error("❌ Erro ao carregar dados do perfil:", error);
        messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados: ${error.message}</p>`;
      }
    }

    await loadUserProfile(usernameFromUrl);

    // Atualiza cor do banner em tempo real
    if (bannerColorInput && bannerPreview) {
      bannerColorInput.addEventListener("input", (e) => {
        bannerPreview.style.background = e.target.value;
      });
    }

    // Pré-visualiza nova imagem de perfil
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) profilePicPreview.src = URL.createObjectURL(file);
      });
    }

    // Envia alterações do formulário
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
                "Authorization": `Bearer ${token}`,
                "X-User-Username": loggedInUsername
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
            console.error("Erro no servidor:", response.status, errorText);

            let errorMessage = "Erro ao salvar o perfil. Verifique os dados.";
            if (response.status === 400 && errorText.includes("Duplicate entry"))
              errorMessage = "Nome de usuário ou e-mail já estão em uso.";
            else if (response.status === 400)
              errorMessage = "Dados inválidos. Verifique o nome e email.";
            else if (response.status === 403)
              errorMessage = "Permissão negada. Faça login novamente.";

            messageArea.innerHTML = `<p style="color: red;">❌ ${errorMessage}</p>`;
          }
        } catch (error) {
          console.error("❌ Erro na requisição de atualização:", error);
          messageArea.innerHTML = `<p style="color: red;">Erro de conexão com o servidor.</p>`;
        }
      });
    }

    // Botão de cancelar edição
    document.getElementById("cancelBtn").addEventListener("click", function () {
      window.location.href = `user-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
    });
  });
})();
