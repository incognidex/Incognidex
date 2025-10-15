document.addEventListener('DOMContentLoaded'), function () {
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
}

// Lógica de autenticação e perfil do usuário

// Seleciona os elementos do perfil
const userProfile = document.getElementById('user-profile');
const profileName = userProfile?.querySelector('.profile-name');
const profileAvatar = userProfile?.querySelector('.profile-avatar');
const logoutLink = userProfile?.querySelector('.logout-link');


//Função: Garantir que apenas usuários autenticados acessem a Home

function requireAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
        // Redireciona para o login se não estiver logado
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
            profileAvatar.src = avatarUrl || '../img/profile-placeholder.png';
        }
    } else {
        // Se não houver nome de usuário, redireciona para login
        window.location.href = 'login.html';
    }
}


//Função: Login (chamada na tela de login ao clicar em "Entrar")

function handleLogin(username, password) {
    // Simulação de autenticação (você pode trocar por uma API real)
    if (username === 'admin' && password === '123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('avatarUrl', '../img/profile-placeholder.png'); // opcional
        window.location.href = 'home.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}


// 4Função: Logout (sair)

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('avatarUrl');
    window.location.href = 'home.html';
}

// Adiciona evento ao botão/link de sair, se existir
if (logoutLink) {
    logoutLink.addEventListener('click', handleLogout);
}


// Execução automática na página Home

document.addEventListener('DOMContentLoaded', () => {
    // Garante que apenas usuários logados acessem
    requireAuth();
    // Carrega dados do perfil (nome, avatar etc.)
    loadUserProfile();
});