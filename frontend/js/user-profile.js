<<<<<<< HEAD
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
=======
// /js/user-profile.js (Código Corrigido)

document.addEventListener('DOMContentLoaded', () => {
  
  console.log("OK: user-profile.js carregado.");

  // Pega o usuário logado para autenticação
  const loggedInUsername = localStorage.getItem('username'); 

  async function loadProfile() {
    
    const params = new URLSearchParams(window.location.search);
    // Define qual perfil vamos VISUALIZAR
    const usernameToView = params.get('username') || loggedInUsername;
    
    if (!usernameToView) {
        console.warn("Nenhum usuário encontrado (na URL ou localStorage) para carregar o perfil.");
        return; 
    }

    console.log("Carregando perfil para:", usernameToView);

    try {
      // --- CORREÇÃO AQUI ---
      // Adiciona os headers de autenticação no fetch
      const res = await fetch(`https://incognidex-backend.onrender.com/api/profile/${encodeURIComponent(usernameToView)}`, {
          method: 'GET',
          headers: {
            // Usa o header que sua API espera (o mesmo do edit-profile.js)
            'X-User-Username': loggedInUsername
            
            // Se sua API usa Token JWT, o correto seria:
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
      // --- FIM DA CORREÇÃO ---
      
      if (!res.ok) {
         console.error(`Falha ao carregar perfil, API retornou ${res.status}. URL: ${res.url}`);
         return;
      }
      const data = await res.json();
      console.log("Dados do perfil recebidos:", data);

      // Preenche os dados na tela
      document.getElementById('user-username').textContent = '@' + (data.username || usernameToView);
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
    
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        console.log("Botão clicado!");
        const usernameEl = document.getElementById('user-username');
        if (!usernameEl) {
           console.error("Não foi possível encontrar o elemento #user-username para pegar o nome.");
           return;
        }
        
        const usernameOnPage = usernameEl.textContent.replace('@','').trim();
        
        // O seu código para o clique do botão já estava correto.
        const url = `edit-profile.html?username=${encodeURIComponent(usernameOnPage)}`;
        console.log("Redirecionando para:", url);
        window.location.href = url;
      });
    } else {
      console.error("Botão 'Editar Perfil' (#edit-profile-btn) NÃO foi encontrado.");
    }
  }

  loadProfile();
  setupEditButton();
>>>>>>> 8cdd02bee9fa6a16a19b38ee2ab871ab0c8a8d7d
});