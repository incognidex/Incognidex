document.addEventListener("DOMContentLoaded", () => {
  console.log("OK: user-profile.js carregado.");

  const loggedInUsername = localStorage.getItem("username");

  async function loadProfile() {
    const params = new URLSearchParams(window.location.search);

    const usernameToView = params.get("username") || loggedInUsername;

    if (!usernameToView) {
      console.warn(
        "Nenhum usuário encontrado (na URL ou localStorage) para carregar o perfil."
      );
      return;
    }

    console.log("Carregando perfil para:", usernameToView);

    try {
      const res = await fetch(
        `https://incognidex-backend.onrender.com/api/profile/${encodeURIComponent(
          usernameToView
        )}`,
        {
          headers: {
            "X-User-Username": loggedInUsername,
          },
        }
      );

      if (!res.ok) {
        console.error(
          `Falha ao carregar perfil, API retornou ${res.status}. URL: ${res.url}`
        );
        return;
      }
      const data = await res.json();
      console.log("Dados do perfil recebidos:", data);

      document.getElementById("user-username").textContent =
        "@" + (data.username || usernameToView);
      document.getElementById("user-name").textContent =
        data.fullName || "Nome Completo";
      document.getElementById("user-bio").textContent =
        data.biografia || "A biografia do usuário será exibida aqui.";
      document.getElementById("user-interests").textContent =
        data.interessesAcademicos || "Não informado";

      const avatar = document.getElementById("profile-pic");
      if (avatar && data.avatarUrl) avatar.src = data.avatarUrl;

      const banner = document.querySelector(".header-background");
      if (banner && data.bannerColor)
        banner.style.background = data.bannerColor;
    } catch (err) {
      console.error(
        "Erro de rede ou JS ao tentar carregar perfil (verifique se a API está no ar)",
        err
      );
    }
  }

  function setupEditButton() {
    const editBtn = document.getElementById("edit-profile-btn");

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        console.log("Botão clicado!");
        const usernameEl = document.getElementById("user-username");

        if (!usernameEl) {
          console.error(
            "Não foi possível encontrar o elemento #user-username para pegar o nome."
          );
          return;
        }

        const usernameOnPage = usernameEl.textContent.replace("@", "").trim();
        if (!usernameOnPage || usernameOnPage === "username") {
          console.warn(
            "Username está vazio ou é o padrão. Redirecionando mesmo assim."
          );
        }

        const url = `edit-profile.html?username=${encodeURIComponent(
          usernameOnPage
        )}`;
        console.log("Redirecionando para:", url);
        window.location.href = url;
      });
    }
  }

  loadProfile();
  setupEditButton();
});
