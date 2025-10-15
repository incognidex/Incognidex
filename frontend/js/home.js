document.addEventListener('DOMContentLoaded', function () {
    // ===========================================
    // 1. Lógica do Carrossel (Swiper)
    // ===========================================

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

    // ===========================================
    // 2. Lógica de Autenticação e Perfil do Usuário
    // ===========================================

    const userProfile = document.getElementById('user-profile');
    const profileName = userProfile?.querySelector('.profile-name');
    const profileAvatar = userProfile?.querySelector('.profile-avatar');
    const logoutLink = userProfile?.querySelector('.logout-link');

    // Função: Garante que apenas usuários autenticados acessem a Home
    function requireAuth() {
        // Agora verifica o authToken, que é o padrão de segurança
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            // Redireciona para o login se não houver token
            window.location.href = 'login.html';
        }
    }

    // Função: Carregar o perfil do usuário logado
    function loadUserProfile() {
        const username = localStorage.getItem('username');
        const avatarUrl = localStorage.getItem('avatarUrl');

        if (username) {
            if (profileName) profileName.textContent = username;
            if (profileAvatar) {
                // Usa o avatar retornado, ou um placeholder padrão
                profileAvatar.src = avatarUrl || '../img/profile-placeholder.png'; 
            }
        } else {
            // Se não houver nome de usuário, mesmo com token, redireciona por segurança
            window.location.href = 'login.html';
        }
    }

    // Função: Logout (sair)
    function handleLogout(event) {
        event.preventDefault();
        // Remove todos os dados de sessão e autenticação
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('avatarUrl');

        // Redireciona para a Home (deslogado) ou Login
        window.location.href = 'index.html';
    }

    // Adiciona evento ao botão/link de sair, se existir
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }

    // ===========================================
    // 3. Execução Principal (ao carregar a página)
    // ===========================================

    // Garante que apenas usuários logados acessem e carrega os dados
    requireAuth();
    loadUserProfile();
});
