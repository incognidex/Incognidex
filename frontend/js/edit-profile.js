(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ edit-profile.js carregado.");

    // VARIÁVEIS
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");
    const loggedInUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    const form = document.getElementById("edit-profile-form");
    const messageArea = document.getElementById("message-area");
    const profilePicPreview = document.getElementById("edit-profile-pic-preview");

    // Garanta que no HTML o input seja <input type="file" id="file" name="fotoPerfil">
    const fileInput = document.getElementById("file");

    const bannerColorInput = document.getElementById("bannerColor");
    const bannerPreview = document.getElementById("profile-banner");

    const BACKEND_URL = "https://incognidex-backend.onrender.com";

    // 1. VALIDAÇÕES DE SEGURANÇA
    if (!loggedInUsername || !token) {
      alert("Sessão expirada.");
      window.location.href = "login.html";
      return;
    }

    if (usernameFromUrl && usernameFromUrl !== loggedInUsername) {
      alert("Você não pode editar este perfil.");
      window.location.href = `user-profile.html?username=${usernameFromUrl}`;
      return;
    }

    // 2. CARREGAR DADOS ATUAIS
    async function loadUserProfile() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/profile/${encodeURIComponent(loggedInUsername)}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            // Algumas rotas GET podem não exigir o X-User-Username, mas por segurança enviamos se a API pedir
            "X-User-Username": loggedInUsername
          }
        });

        if (!response.ok) throw new Error(`Erro ${response.status}`);

        const user = await response.json();

        // Preenche os campos
        document.getElementById("username").value = user.username || loggedInUsername;
        document.getElementById("nomeCompleto").value = user.nomeCompleto || user.fullName || "";
        document.getElementById("biografia").value = user.biografia || "";
        document.getElementById("interessesAcademicos").value = user.interessesAcademicos || "";

        // Trata a imagem
        profilePicPreview.src = user.urlFoto || user.avatarUrl || "https://placehold.co/150";

        if (bannerColorInput) bannerColorInput.value = user.bannerColor || "#222";
        if (bannerPreview) bannerPreview.style.background = user.bannerColor || "#222";

      } catch (error) {
        console.error("Erro ao carregar:", error);
        messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados.</p>`;
      }
    }

    await loadUserProfile();

    // 3. PREVIEWS VISUAIS (Banner e Foto)
    if (bannerColorInput && bannerPreview) {
      bannerColorInput.addEventListener("input", (e) => bannerPreview.style.background = e.target.value);
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) profilePicPreview.src = URL.createObjectURL(file);
      });
    }

    // 4. SALVAR ALTERAÇÕES (AQUI ESTAVA O ERRO)
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        messageArea.innerHTML = `<p style="color: orange;">Salvando...</p>`;

        const formData = new FormData(form);

        // CORREÇÃO DE ARQUIVO:
        // O Controller espera @RequestParam("fotoPerfil").
        // Se o input HTML tiver name="fotoPerfil", o formData já pega certo.
        // Se o usuário NÃO escolheu arquivo, deletamos a chave para evitar enviar um arquivo vazio "undefined"
        if (!fileInput.files.length) {
          formData.delete("fotoPerfil");
          formData.delete("file"); // Garante limpeza caso o input chamasse "file"
        }

        try {
          const response = await fetch(`${BACKEND_URL}/api/profile/edit`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "X-User-Username": loggedInUsername // <--- IMPORTANTE: O Controller exige isso!
            },
            body: formData
            // IMPORTANTE: Não defina 'Content-Type' manualmente com FormData!
          });

          if (response.ok) {
            const updatedUser = await response.json();
            messageArea.innerHTML = `<p style="color: green;">✅ Salvo com sucesso!</p>`;

            setTimeout(() => {
              window.location.href = `user-profile.html?username=${encodeURIComponent(updatedUser.username || loggedInUsername)}`;
            }, 1500);
          } else {
            const errorText = await response.text();
            console.error("Erro Backend:", errorText);
            messageArea.innerHTML = `<p style="color: red;">Erro: ${errorText}</p>`;
          }
        } catch (error) {
          console.error(error);
          messageArea.innerHTML = `<p style="color: red;">Erro de conexão.</p>`;
        }
      });
    }

    // Cancelar
    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        window.location.href = `user-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
      });
    }
  });
})();