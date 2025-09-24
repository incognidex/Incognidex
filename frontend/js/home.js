document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o Swiper para o carrossel de banner principal
    const bannerSwiper = new Swiper('.banner-carousel .swiper', {
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

    // Inicializa o Swiper para cada seção de cursos com rolagem horizontal
    const courseSwipers = document.querySelectorAll('.swiper-container-custom');

    courseSwipers.forEach(container => {
        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: false,
            pagination: false,
            navigation: {
                nextEl: container.querySelector('.swiper-button-next'),
                prevEl: container.querySelector('.swiper-button-prev'),
            },
        });
    });

// --- Lógica de autenticação e perfil do usuário ---
const userProfile = document.getElementById('user-profile');
const profileName = userProfile.querySelector('.profile-name');
const profileAvatar = userProfile.querySelector('.profile-avatar');
const logoutLink = userProfile.querySelector('.logout-link');

// Função para buscar e exibir os dados do usuário logado
function loadUserProfile() {
    // Pega as informações de login do localStorage
    // CORRIGIDO: Agora usa 'username' e 'avatarUrl'
    const username = localStorage.getItem('username');
    const avatarUrl = localStorage.getItem('avatarUrl');

    if (username) {
        // Se o nome de usuário existe, ele está logado.
        profileName.textContent = username;

        if (avatarUrl) {
            // CORRIGIDO: Usa a URL completa do avatar que você salvou
            profileAvatar.src = avatarUrl;
        } else {
            profileAvatar.src = '../img/profile-placeholder.png';
        }
    } else {
        // Se não houver nome de usuário, redireciona para a página de login.
    }
}

// Chame a função para carregar o perfil quando a página for carregada
document.addEventListener('DOMContentLoaded', loadUserProfile);

    // Função para lidar com o logout
    function handleLogout(event) {
        event.preventDefault(); // Impede o link de navegar
        // Remove as informações de login do localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        // Redireciona para a página de login para um logout completo
        window.location.href = 'login.html';
    }

    // Adiciona o evento de clique para o link de "Sair"
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }

    // Chama a função ao carregar a página para exibir os dados do usuário
    loadUserProfile();
});