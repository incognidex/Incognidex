(() => {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ edit-profile.js carregado.");

    // ==========================
    // VARIÁVEIS PRINCIPAIS
    // ==========================
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

    const BACKEND_URL = "https://incognidex-backend.onrender.com";

    // ==========================
    // VALIDAÇÕES INICIAIS
    // ==========================
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

    // ==========================
    // FUNÇÃO: Carrega perfil
    // ==========================
    async function loadUserProfile(username) {
      try {
        console.log(`🔹 Buscando perfil de: ${username}`);

        const response = await fetch(`${BACKEND_URL}/api/profile/${encodeURIComponent(username)}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error("Token inválido ou expirado (401)");
          if (response.status === 403) throw new Error("Acesso negado. (403)");
          if (response.status === 404) throw new Error("Perfil não encontrado (404)");
          throw new Error(`Erro desconhecido (Status: ${response.status})`);
        }

        const user = await response.json();
        console.log("🟢 Perfil carregado com sucesso:", user);

        // ==========================
        // Preenche campos do formulário
        // ==========================
        document.getElementById("username").value = user.username || "";
        document.getElementById("nomeCompleto").value = user.nomeCompleto || user.fullName || "";
        document.getElementById("biografia").value = user.biografia || "";
        document.getElementById("interessesAcademicos").value = user.interessesAcademicos || "";

        profilePicPreview.src = user.urlFoto || "https://via.placeholder.com/150";

        const color = user.bannerColor || "#222";
        if (bannerColorInput) bannerColorInput.value = color;
        if (bannerPreview) bannerPreview.style.background = color;

      } catch (error) {
        console.error("❌ Erro ao carregar perfil:", error);
        messageArea.innerHTML = `<p style="color: red;">${error.message}</p>`;
      }
    }

    await loadUserProfile(usernameFromUrl);

    // ==========================
    // Atualiza cor do banner em tempo real
    // ==========================
    if (bannerColorInput && bannerPreview) {
      bannerColorInput.addEventListener("input", (e) => {
        bannerPreview.style.background = e.target.value;
      });
    }

    // ==========================
    // Pré-visualiza nova imagem de perfil
    // ==========================
    if (fileInput) {
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          profilePicPreview.src = URL.createObjectURL(file);
        }
      });
    }

    // ==========================
    // Submissão do formulário
    // ==========================
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        if (!fileInput.files.length) formData.delete("file");

        try {
          messageArea.innerHTML = `<p style="color: orange;">Salvando alterações...</p>`;

          const response = await fetch(`${BACKEND_URL}/api/profile/edit`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          });

          if (response.ok) {
            const updatedUser = await response.json();
            console.log("🟢 Perfil atualizado:", updatedUser);
            messageArea.innerHTML = `<p style="color: green; font-weight: bold;">✅ Perfil atualizado com sucesso!</p>`;

            setTimeout(() => {
              window.location.href = `user-profile.html?username=${encodeURIComponent(updatedUser.username)}`;
            }, 1500);
          } else {
            const errorText = await response.text();
            console.error("Erro no servidor:", response.status, errorText);

            let errorMessage = "Erro ao salvar o perfil. Verifique os dados.";
            if (response.status === 400 && errorText.includes("Duplicate entry"))
              errorMessage = "Nome de usuário ou e-mail já estão em uso.";
            else if (response.status === 400)
              errorMessage = "Dados inválidos. Verifique os campos.";
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

    // ==========================
    // Botão "Cancelar"
    // ==========================
    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        window.location.href = `user-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
      });
    }
  });
})();
