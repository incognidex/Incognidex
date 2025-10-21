document.addEventListener('DOMContentLoaded', () => {
  async function loadProfile() {

    if (!username) return;

    try {
      const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(username)}`);
      if (!res.ok) return;
      const data = await res.json();
      
      document.getElementById('user-username').textContent = '@' + (data.username || username);
      
      document.getElementById('user-name').textContent = data.fullName || 'Nome Completo'; 
      
      document.getElementById('user-bio').textContent = data.biografia || 'A biografia do usuário será exibida aqui.';
      
      document.getElementById('user-interests').textContent = data.interessesAcademicos || 'Não informado'; 

      const avatar = document.getElementById('profile-pic');
      if (data.avatarUrl) avatar.src = data.avatarUrl;

      const banner = document.querySelector('.header-background'); 
      if (data.bannerColor) banner.style.background = data.bannerColor;

    } catch (err) {
      console.error('Erro ao carregar perfil', err);
    }
  }

  loadProfile();

  const editBtn = document.getElementById('edit-profile-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const username = document.getElementById('user-username').textContent.replace('@','').trim();
      window.location.href = `edit-profile.html?username=${encodeURIComponent(username)}`;
    });
  }
});