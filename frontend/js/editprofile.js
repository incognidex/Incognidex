document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const profileUsername = urlParams.get('username');

    const form = document.getElementById('editProfileForm');
    const messageDisplay = document.getElementById('messageDisplay');
    const profilePictureInput = document.getElementById('profilePictureInput');
    const profilePicturePreview = document.getElementById('profilePicturePreview');
    const removePictureBtn = document.getElementById('removePictureBtn');

    if (!profileUsername) {
        messageDisplay.textContent = 'Nome de usuário não especificado.';
        messageDisplay.style.color = 'red';
        return;
    }

    // Função para carregar os dados atuais do perfil
    const fetchProfileData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/profile/${profileUsername}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados do perfil.');
            }
            const user = await response.json();

            // Preencher os campos do formulário
            document.getElementById('username').value = user.username || '';
            document.getElementById('nomeCompleto').value = user.fullName || '';
            document.getElementById('biografia').value = user.biografia || '';
            document.getElementById('interessesAcademicos').value = user.interessesAcademicos || '';
            if (user.avatarUrl) {
                profilePicturePreview.src = user.avatarUrl;
            } else {
                profilePicturePreview.src = 'https://via.placeholder.com/150';
            }

        } catch (error) {
            messageDisplay.textContent = `Erro: ${error.message}`;
            messageDisplay.style.color = 'red';
        }
    };

    // Chamar a função para carregar os dados
    await fetchProfileData();

    // Event listener para mostrar a prévia da foto
    profilePictureInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicturePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Event listener para remover a foto
    removePictureBtn.addEventListener('click', () => {
        profilePictureInput.value = ''; // Limpa o input file
        profilePicturePreview.src = 'https://via.placeholder.com/150';
    });

    // Event listener para o envio do formulário
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        messageDisplay.textContent = 'Salvando...';
        messageDisplay.style.color = 'black';

        const formData = new FormData();
        formData.append('username', document.getElementById('username').value);
        formData.append('nomeCompleto', document.getElementById('nomeCompleto').value);
        formData.append('biografia', document.getElementById('biografia').value);
        formData.append('interessesAcademicos', document.getElementById('interessesAcademicos').value);

        const fileInput = document.getElementById('profilePictureInput');
        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        try {
            const response = await fetch('http://localhost:8080/api/profile/edit', {
                method: 'PUT',
                body: formData
                // Headers não são necessários aqui, pois o FormData define automaticamente
                // o Content-Type como multipart/form-data
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao salvar as alterações.');
            }

            const updatedUser = await response.json();
            messageDisplay.textContent = 'Perfil atualizado com sucesso!';
            messageDisplay.style.color = 'green';

            // Atualizar a URL da foto se ela foi alterada
            profilePicturePreview.src = updatedUser.avatarUrl || 'https://via.placeholder.com/150';

        } catch (error) {
            messageDisplay.textContent = `Erro: ${error.message}`;
            messageDisplay.style.color = 'red';
        }
    });
});