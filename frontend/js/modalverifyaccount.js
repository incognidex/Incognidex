document.addEventListener('DOMContentLoaded', async () => {
    const editButton = document.getElementById('edit-profile-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const profileUsername = urlParams.get('username');

    // Em uma aplicação real, você usaria um JWT token para isso.
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (!profileUsername) {
        console.error('Nome de usuário não especificado na URL.');
        return;
    }

    try {
        // Obter os dados do perfil
        const response = await fetch(`http://localhost:8080/api/profile/${profileUsername}`);
        if (!response.ok) {
            throw new Error('Perfil não encontrado.');
        }
        const user = await response.json();

        // Preencher a página com os dados do usuário
        document.getElementById('user-name').textContent = user.fullName || user.username;
        document.getElementById('user-username').textContent = `@${user.username}`;
        document.getElementById('profile-pic').src = user.avatarUrl || 'https://via.placeholder.com/150';
        document.getElementById('user-bio').textContent = user.biografia || 'Nenhuma biografia informada.';
        document.getElementById('user-interests').textContent = user.interessesAcademicos || 'Nenhum interesse informado.';
        const joinDate = new Date(user.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('user-join-date').textContent = joinDate;


        if (loggedInUsername === profileUsername) {
            editButton.style.display = 'block';

            // Adiciona o evento de clique para exibir a modal de verificação
            editButton.addEventListener('click', () => {
                showPasswordVerificationModal(profileUsername);
            });
        }

    } catch (error) {
        console.error('Erro ao carregar o perfil:', error);
    }
});

// A nova função para mostrar a modal e verificar a senha
async function showPasswordVerificationModal(username) {
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const verifyButton = document.getElementById('modal-verify-btn');
    const errorMessage = document.getElementById('modal-error-message');
    const closeBtn = document.querySelector('.close-btn');

    // Limpa o campo de senha e a mensagem de erro
    passwordInput.value = '';
    errorMessage.textContent = '';

    // Exibe a modal
    modal.style.display = 'block';

    // Fecha a modal ao clicar no 'x'
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Fecha a modal ao clicar fora dela
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Adiciona o evento de clique ao botão de confirmação da modal
    verifyButton.onclick = async () => {
        const password = passwordInput.value;
        if (!password) {
            errorMessage.textContent = 'Por favor, digite sua senha.';
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/profile/verify-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // Senha correta, redireciona para a página de edição
                window.location.href = `edit-profile.html?username=${username}`;
            } else {
                // Senha incorreta, exibe erro
                errorMessage.textContent = 'Senha incorreta. Tente novamente.';
            }
        } catch (error) {
            console.error('Erro na verificação da senha:', error);
            errorMessage.textContent = 'Erro ao tentar verificar a senha. Tente novamente mais tarde.';
        }
    };
}