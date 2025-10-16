document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get('username'); // O username do perfil a ser editado
    const form = document.getElementById('edit-profile-form');
    const messageArea = document.getElementById('message-area');
    const profilePicPreview = document.getElementById('edit-profile-pic-preview');
    const fileInput = document.getElementById('file');

    if (!usernameFromUrl) {
        console.error('Nome de usuário não especificado para edição.');
        window.location.href = 'index.html'; // Redireciona se não houver username
        return;
    }

    // Função para buscar e pré-preencher os dados do usuário
    async function loadUserProfile(username) {
        try {
            // Usa o GET do seu UserProfileController
            const response = await fetch(`http://localhost:8080/api/profile/${username}`);
            if (!response.ok) {
                throw new Error('Perfil não encontrado para edição.');
            }
            const user = await response.json();

            // Pré-preenche o formulário usando os novos nomes das propriedades do DB
            // (user.nome_completo, user.url_foto, user.interesses_academicos)
            document.getElementById('username').value = user.username || '';
            document.getElementById('nomeCompleto').value = user.nome_completo || '';
            document.getElementById('biografia').value = user.biografia || '';
            document.getElementById('interessesAcademicos').value = user.interesses_academicos || '';
            profilePicPreview.src = user.url_foto || 'https://via.placeholder.com/150';

        } catch (error) {
            console.error('Erro ao carregar dados do perfil:', error);
            messageArea.innerHTML = `<p style="color: red;">Erro ao carregar dados para edição.</p>`;
        }
    }

    // O backend espera o nome de usuário autenticado no cabeçalho 'X-User-Username'.
    const loggedInUsername = localStorage.getItem('loggedInUsername');

    if (!loggedInUsername || loggedInUsername !== usernameFromUrl) {
        console.error('Usuário logado não corresponde ao perfil a ser editado.');
        alert('Você não tem permissão para editar este perfil.');
        window.location.href = `user-profile.html?username=${usernameFromUrl}`;
        return;
    }

    loadUserProfile(usernameFromUrl);

    // Pré-visualização da imagem
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            profilePicPreview.src = URL.createObjectURL(file);
        }
    });

    // Evento de submissão do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        if (fileInput.files.length === 0) {
                formData.delete('file');
        }

        try {
            messageArea.innerHTML = `<p style="color: orange;">Salvando alterações...</p>`;

            // Chama o endpoint PUT /api/profile/edit
            const response = await fetch(`http://localhost:8080/api/profile/edit`, {
                method: 'PUT',
                headers: {
                    // Simulação do header de autenticação esperado pelo seu controller
                    'X-User-Username': loggedInUsername
                },
                body: formData
            });

            if (response.ok) {
                const updatedUser = await response.json();
                messageArea.innerHTML = `<p style="color: green; font-weight: bold;">✅ Perfil atualizado com sucesso!</p>`;

                // Redireciona para o novo perfil
                setTimeout(() => {
                    window.location.href = `user-profile.html?username=${updatedUser.username}`;
                }, 1500);

            } else {
                const errorText = await response.text();
                let errorMessage = 'Erro ao salvar o perfil. Verifique os dados.';

                if (response.status === 400 && errorText.includes("Duplicate entry")) {
                    errorMessage = 'Nome de usuário ou e-mail já estão em uso.';
                } else if (response.status === 400) {
                    errorMessage = 'Dados inválidos. Verifique se o nome de usuário tem o formato correto.';
                }

                messageArea.innerHTML = `<p style="color: red;">❌ ${errorMessage}</p>`;
                console.error('Erro na resposta do servidor:', response.status, errorText);
            }
        } catch (error) {
            console.error('Erro na requisição de atualização:', error);
            messageArea.innerHTML = `<p style="color: red;">Erro de conexão com o servidor.</p>`;
        }
    });

    document.getElementById('cancelBtn').addEventListener('click', function() {
        window.location.href = 'user-profile.html';
    });
});