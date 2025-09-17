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
        const userName = localStorage.getItem('userName');
        const userImage = localStorage.getItem('userImage');

        if (userName) {
            // Se o nome de usuário existe, ele está logado.
            // Preenche o nome do usuário
            profileName.textContent = userName;

            // Define a URL da imagem de perfil
            if (userImage) {
                // Usa a rota do seu backend para buscar a imagem
                profileAvatar.src = `/api/images/${userImage}`;
            } else {
                // Se não houver imagem, usa um placeholder
                profileAvatar.src = '../img/profile-placeholder.png';
            }
        } else {
            // Se não houver nome de usuário, redireciona para a página de login.
            // Isso impede que a página seja acessada sem login.
            window.location.href = 'login.html';
        }
    }

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