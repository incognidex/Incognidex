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

    if (!usernameFromUrl) {
      console.error("Nome de usuário não especificado para edição.");
      window.location.href = "index.html";
      return;
    }

    // 🔹 Carrega dados do perfil
    async function loadUserProfile(username) {
      try {
        const response = await fetch(
          `https://incognidex-backend.onrender.com/api/profile/${username}`,
          { headers: { "X-User-Username": loggedInUsername } }
        );

        if (!response.ok) {
          throw new Error(`Perfil não encontrado ou acesso negado (Status: ${response.status})`);
        }

        const user = await response.json();

        // 🔸 Preenche campos do formulário
        document.getElementById("username").value = user.username || "";
        document.getElementById("nomeCompleto").value =
          user.nome_completo || user.fullName || "";
        document.getElementById("biografia").value = user.biografia || "";
        document.getElementById("interessesAcademicos").value =
          user.interesses_academicos || "";
        profilePicPreview.src = user.url_foto || "https://via.placeholder.com/150";

        const color = user.bannerColor || user.banner_color || "";
        if (bannerColorInput && color) bannerColorInput.value = color;
        if (bannerPreview && color) bannerPreview.style.background = color;
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados para edição. ${error.message}</p>`;
      }
    }

    // 🔹 Impede que outro usuário edite um perfil que não é o dele
    if (!loggedInUsername || loggedInUsername.toLowerCase() !== usernameFromUrl.toLowerCase()) {
      console.error("Usuário logado não corresponde ao perfil a ser editado.");
      alert("Você não tem permissão para editar este perfil.");
      window.location.href = `user-profile.html?username=${usernameFromUrl}`;
      return;
    }

    await loadUserProfile(usernameFromUrl);

    // 🔹 Atualiza a prévia da cor do banner
    if (bannerColorInput && bannerPreview) {
      bannerColorInput.addEventListener("input", (e) => {
        bannerPreview.style.background = e.target.value;
      });
    }

    // 🔹 Atualiza a prévia da foto de perfil
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) profilePicPreview.src = URL.createObjectURL(file);
      });
    }

    // 🔹 Envio do formulário
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        // 🔸 Não enviar o username, pois não é editável
        formData.delete("username");

        // 🔸 Se não há nova imagem, remove o campo file
        if (fileInput.files.length === 0) formData.delete("file");

        try {
          messageArea.innerHTML = `<p style="color: orange;">Salvando alterações...</p>`;
          const response = await fetch(
            `https://incognidex-backend.onrender.com/api/profile/edit`,
            {
              method: "PUT",
              headers: { "X-User-Username": loggedInUsername },
              body: formData,
            }
          );

          if (response.ok) {
            const updatedUser = await response.json();
            messageArea.innerHTML = `<p style="color: green; font-weight: bold;">✅ Perfil atualizado com sucesso!</p>`;

            // 🔸 Não alterar username no localStorage, já que ele é fixo
            setTimeout(() => {
              window.location.href = `user-profile.html?username=${loggedInUsername}`;
            }, 1500);
          } else {
            const errorText = await response.text();
            let errorMessage = "Erro ao salvar o perfil. Verifique os dados.";
            if (response.status === 400 && errorText.includes("Duplicate entry"))
              errorMessage = "E-mail já está em uso.";
            else if (response.status === 400)
              errorMessage = "Dados inválidos. Verifique os campos preenchidos.";
            else if (response.status === 403)
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

    // 🔹 Botão de cancelar
    document.getElementById("cancelBtn").addEventListener("click", function () {
      window.location.href = `user-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
    });
  });
})();
