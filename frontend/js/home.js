document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o Swiper para o carrossel principal
    const mainSwiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- Lógica de autenticação e perfil do usuário ---
    const userProfile = document.getElementById('user-profile');
    const profileName = userProfile.querySelector('.profile-name');
    const profileAvatar = userProfile.querySelector('.profile-avatar');
    const logoutLink = userProfile.querySelector('.logout-link');

    // Função para buscar e exibir os dados do usuário logado
    function loadUserProfile() {
        // Pega as informações de login do localStorage
        const username = localStorage.getItem('username');
        const avatarUrl = localStorage.getItem('avatarUrl');

        if (username) {
            // Se o nome de usuário existe, ele está logado.
            profileName.textContent = username;

            if (avatarUrl) {
                profileAvatar.src = avatarUrl;
            } else {
                profileAvatar.src = 'img/profile-placeholder.png';
            }
        } else {
            // Se não houver nome de usuário, você pode redirecionar para a página de login
            // window.location.href = 'login.html';
            console.log("Usuário não logado. Redirecionando ou exibindo link de login.");
        }
    }

    // Função para lidar com o logout
    function handleLogout(event) {
        event.preventDefault(); // Impede o link de navegar
        // Remove as informações de login do localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('avatarUrl');
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }

    // Adiciona o evento de clique para o link de "Sair"
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }

    // Chama a função ao carregar a página para exibir os dados do usuário
    loadUserProfile();
});

document.addEventListener('DOMContentLoaded', () => {
  const editBtn = document.getElementById('editProfileBtn');
  if (!editBtn) return;

  editBtn.addEventListener('click', () => {
    // tenta ler o username mostrado na página (ajuste o seletor se necessário)
    const usernameEl = document.getElementById('profileUsername');
    const username = usernameEl ? usernameEl.textContent.trim() : null;

    if (username) {
      sessionStorage.setItem('editingUsername', username);
    } else {
      // fallback: limpa chave para indicar edição do "usuário logado"
      sessionStorage.removeItem('editingUsername');
    }

    window.location.href = 'edit-profile.html';
  });
});