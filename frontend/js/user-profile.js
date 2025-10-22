document.addEventListener('DOMContentLoaded', () => {
  
  console.log("OK: user-profile.js carregado.");

  async function loadProfile() {
    
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username') || localStorage.getItem('username');
    
    if (!username) {
        console.warn("Nenhum usuário encontrado (na URL ou localStorage) para carregar o perfil.");
        return; 
    }

    console.log("Carregando perfil para:", username);

    try {
      const res = await fetch(`https://incognidex-backend.onrender.com/api/profile/${encodeURIComponent(username)}`);
      
      if (!res.ok) {
         console.error(`Falha ao carregar perfil, API retornou ${res.status}. URL: ${res.url}`);
         return;
      }
      const data = await res.json();
      console.log("Dados do perfil recebidos:", data);

      document.getElementById('user-username').textContent = '@' + (data.username || username);
      document.getElementById('user-name').textContent = data.fullName || 'Nome Completo'; 
      document.getElementById('user-bio').textContent = data.biografia || 'A biografia do usuário será exibida aqui.';
      document.getElementById('user-interests').textContent = data.interessesAcademicos || 'Não informado'; 

      const avatar = document.getElementById('profile-pic');
      if (avatar && data.avatarUrl) avatar.src = data.avatarUrl;

      const banner = document.querySelector('.header-background'); 
      if (banner && data.bannerColor) banner.style.background = data.bannerColor;

    } catch (err) {
      console.error('Erro de rede ou JS ao tentar carregar perfil (verifique se a API está no ar)', err);
    }
  }

  function setupEditButton() {
    const editBtn = document.getElementById('edit-profile-btn');
    
      editBtn.addEventListener('click', () => {
        console.log("Botão clicado!");
        const usernameEl = document.getElementById('user-username');
        
        if (!usernameEl) {
           console.error("Não foi possível encontrar o elemento #user-username para pegar o nome.");
           return;
        }
        
        const username = usernameEl.textContent.replace('@','').trim();
        if (!username || username === 'username') {
           console.warn("Username está vazio ou é o padrão. Redirecionando mesmo assim.");
        }
        
        const url = `https://www.incognidex.com.br/edit-profile.html?username=${encodeURIComponent(username)}`;
        console.log("Redirecionando para:", url);
        window.location.href = url;
      });
  }

  loadProfile();
  setupEditButton();

});