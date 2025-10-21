document.addEventListener('DOMContentLoaded', () => {
  async function loadProfile() {
    
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || localStorage.getItem('loggedInUsername');

    if (!username) {
        console.warn("Nenhum usuário encontrado para carregar.");
        return; 
    }

    try {
      const res = await fetch(`http://localhost:8080/api/profile/${encodeURIComponent(username)}`);
      if (!res.ok) {
         console.error("Falha ao carregar perfil, resposta não-OK:", res.status);
         return;
      }
      const data = await res.json();
      
      document.getElementById('user-username').textContent = '@' + (data.username || username);
      document.getElementById('user-name').textContent = data.fullName || 'Nome Completo'; 
      document.getElementById('user-bio').textContent = data.biografia || 'A biografia do usuário será exibida aqui.';
      document.getElementById('user-interests').textContent = data.interessesAcademicos || 'Não informado'; 

      const avatar = document.getElementById('profile-pic');
      if (avatar && data.avatarUrl) avatar.src = data.avatarUrl;

      const banner = document.querySelector('.header-background'); 
      if (banner && data.bannerColor) banner.style.background = data.bannerColor;

    } catch (err) {
      console.error('Erro de rede ou JS ao carregar perfil', err);
    }
  }

  loadProfile();

  const editBtn = document.getElementById('edit-profile-btn');
  
  if (editBtn) {
    console.log("Botão 'Editar Perfil' encontrado. Adicionando clique.");
    editBtn.addEventListener('click', () => {
      const usernameEl = document.getElementById('user-username');
      if (!usernameEl) {
         console.error("Não foi possível encontrar o elemento #user-username");
         return;
      }
      
      const username = usernameEl.textContent.replace('@','').trim();
      if (!username) {
         console.warn("Username está vazio, redirecionando mesmo assim.");
      }
      
      console.log("Redirecionando para edit-profile.html...");
      window.location.href = `edit-profile.html?username=${encodeURIComponent(username)}`;
    });
  } else {
    console.error("Botão #edit-profile-btn não encontrado.");
  }
});