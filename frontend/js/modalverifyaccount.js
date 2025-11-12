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
        const response = await fetch(`https://incognidex-backend.onrender.com/api/profile/${profileUsername}`);
        if (!response.ok) {
            throw new Error('Perfil não encontrado.');
}
        const user = await response.json();

// Preencher a página com os dados do usuário, usando os novos nomes:
        document.getElementById('user-name').textContent = user.nome_completo || user.username; // MUDANÇA: user.nome_completo
        document.getElementById('user-username').textContent = `@${user.username}`;
        document.getElementById('profile-pic').src = user.url_foto || 'https://via.placeholder.com/150'; // MUDANÇA: user.url_foto
        document.getElementById('user-bio').textContent = user.biografia || 'Nenhuma biografia informada.';
        document.getElementById('user-interests').textContent = user.interesses_academicos || 'Nenhum interesse informado.'; // MUDANÇA: user.interesses_academicos
        // O campo `criacao` ou `created_at` deve ser usado aqui. Assumindo `criacao`:
            const joinDate = new Date(user.criacao).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
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

// A função showPasswordVerificationModal() permanece a mesma
async function showPasswordVerificationModal(username) {
    // ... (restante da função)
}