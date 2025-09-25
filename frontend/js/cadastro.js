document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const fullName = document.getElementById('full_name').value;
        const avatarUrl = document.getElementById('avatar_url').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const payload = {
            username: username,
            email: email,
            password: password,
            fullName: fullName,
            avatarUrl: avatarUrl
        };

        try {
            const response = await fetch('https://incognidex-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html';
            } else {
                const errorText = await response.text();
                alert(`Erro no cadastro: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});