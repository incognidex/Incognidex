document.addEventListener('DOMContentLoaded', () => {
  async function loadProfile() {
    // obtém username da query string se existir, senão tenta usar "logged in" (ajuste conforme auth)
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || localStorage.getItem('loggedInUsername');
    if (!username) return;

    try {
      const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(username)}`);
      if (!res.ok) return;
      const data = await res.json();
      document.getElementById('user-username').textContent = '@' + (data.username || username);
      document.getElementById('user-fullname').textContent = data.fullName || '';
      document.getElementById('user-biografia').textContent = data.biografia || '';
      document.getElementById('user-interesses').textContent = data.interessesAcademicos || '';
      const avatar = document.getElementById('user-avatar');
      if (data.avatarUrl) avatar.src = data.avatarUrl;
      const banner = document.getElementById('profile-banner');
      if (data.bannerColor) banner.style.background = data.bannerColor;
    } catch (err) {
      console.error('Erro ao carregar perfil', err);
    }
  }

  loadProfile();

  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      // passa username por query string ou usar sessionStorage se preferir
      const username = document.getElementById('user-username').textContent.replace('@','').trim();
      window.location.href = `edit-profile.html?username=${encodeURIComponent(username)}`;
    });
  }
});