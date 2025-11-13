document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ user-profile.js carregado.");

  const loggedInUsername = localStorage.getItem('username');
  const authToken = localStorage.getItem('token');

  async function loadProfile() {
    const params = new URLSearchParams(window.location.search);
    const usernameToView = params.get('username') || loggedInUsername;

    if (!usernameToView) {
      console.warn("Nenhum usuário para exibir.");
      return;
    }

    try {
      const headers = {};
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

      // Mantemos o header extra caso alguma lógica do GET precise dele
      if (loggedInUsername) headers['X-User-Username'] = loggedInUsername;

      const res = await fetch(`https://incognidex-backend.onrender.com/api/profile/${encodeURIComponent(usernameToView)}`, {
        method: 'GET',
        headers: headers
      });

      if (!res.ok) {
        console.error(`Erro API: ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Dados recebidos:", data);

      // Renderização segura (verifica se elementos existem)
      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };

      setText('user-username', '@' + (data.username || usernameToView));
      // Tenta pegar nomeCompleto OU fullName
      setText('user-name', data.nomeCompleto || data.fullName || 'Nome Completo');
      setText('user-bio', data.biografia || 'Sem biografia.');
      setText('user-interests', data.interessesAcademicos || 'Não informado');

      // Imagem
      const avatar = document.getElementById('profile-pic');
      // Tenta pegar urlFoto OU avatarUrl
      if (avatar) avatar.src = data.urlFoto || data.avatarUrl || "https://placehold.co/150";

      // Banner
      const banner = document.getElementById('profile-banner') || document.querySelector('.header-background');
      if (banner && data.bannerColor) banner.style.background = data.bannerColor;

    } catch (err) {
      console.error('Erro de conexão:', err);
    }
  }

  function setupEditButton() {
    const editBtn = document.getElementById('edit-profile-btn');
    // Verifica se está visualizando o próprio perfil
    const params = new URLSearchParams(window.location.search);
    const currentView = params.get('username');

    // Se estou vendo o perfil de outra pessoa, escondo o botão editar
    if (currentView && loggedInUsername && currentView !== loggedInUsername) {
      if (editBtn) editBtn.style.display = 'none';
      return;
    }

    if (editBtn) {
      editBtn.addEventListener('click', () => {
        window.location.href = `edit-profile.html?username=${encodeURIComponent(loggedInUsername)}`;
      });
    }
  }

  loadProfile();
  setupEditButton();
});