document.addEventListener('DOMContentLoaded', () => {
  // Carrega os dados do perfil ao abrir a página
  async function loadProfile() {
    // obtém username da query string se existir, senão tenta usar "logged in" (ajuste conforme auth)
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || localStorage.getItem('loggedInUsername');
    if (!username) return; 
    try {
      // Chamada para o backend
      const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(username)}`);
      if (!res.ok) return;
      const data = await res.json();

      // Preenche elementos da página com os dados retornados
      document.getElementById('user-username').textContent = '@' + (data.username || username);
      document.getElementById('user-fullname').textContent = data.fullName || '';
      document.getElementById('user-biografia').textContent = data.biografia || '';
      document.getElementById('user-interesses').textContent = data.interessesAcademicos || '';
      const avatar = document.getElementById('user-avatar');
      if (data.avatarUrl) avatar.src = data.avatarUrl;

      // Banner: tenta aplicar bannerColor
      const banner = document.getElementById('profile-banner');
      const color = data.bannerColor ?? data.banner_color ?? null;
      if (banner && color) {
        try { banner.style.background = color; } catch (e) { console.warn('Cor do banner inválida:', color); }
      }

    } catch (err) {
      console.error('Erro ao carregar perfil', err);
    }
  }

  loadProfile();

  // Botão "Editar perfil": encaminha para edit-profile.html passando o username atual
  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      // remove o @ e espaços antes de enviar na query string
      const username = document.getElementById('user-username').textContent.replace('@','').trim();
      window.location.href = `edit-profile.html?username=${encodeURIComponent(username)}`;
    });
  }
});