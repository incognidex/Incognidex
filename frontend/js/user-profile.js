document.addEventListener('DOMContentLoaded', async () => {
    // Esconder o botão de edição por padrão
    const editButton = document.getElementById('edit-profile-btn');
    if (editButton) {
        editButton.style.display = 'none';
    }

    // Obtenha o nome de usuário do perfil que está sendo visualizado a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileUsername = urlParams.get('username');

    // Supondo que você armazena o nome de usuário logado em algum lugar (por exemplo, localStorage)
    // Em uma aplicação real, você usaria um JWT token para isso.
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (!profileUsername) {
        console.error('Nome de usuário não especificado na URL.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/profile/${profileUsername}`);
        if (!response.ok) {
            throw new Error('Perfil não encontrado.');
        }
        const user = await response.json();

        // Aplicar a cor do perfil
        document.documentElement.style.setProperty('--user-profile-color', user.profileColor || '#FFA500');

        // Preencher a página com os dados do usuário
        document.getElementById('user-name').textContent = user.nomeCompleto || user.username;
        document.getElementById('user-username').textContent = `@${user.username}`;
        document.getElementById('profile-pic').src = user.urlFoto || 'https://via.placeholder.com/150';
        document.getElementById('user-bio').textContent = user.biografia || 'Nenhuma biografia informada.';
        document.getElementById('user-interests').textContent = user.interessesAcademicos || 'Nenhum interesse informado.';
        const joinDate = new Date(user.criacao).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('user-join-date').textContent = joinDate;

        // NOVO: Verifica se o usuário logado é o dono do perfil
        if (loggedInUsername === profileUsername) {
            if (editButton) {
                editButton.style.display = 'block';
                editButton.addEventListener('click', () => {
                    // Redireciona para a página de edição de perfil
                    window.location.href = `edit-profile.html?username=${profileUsername}`;
                });
            }
        }

    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
    }
});