document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;

        const payload = {
            username: identifier,
            password: password
        };

        try {
            const response = await fetch('https://incognidex-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // O backend deve retornar o nome do usuário e, idealmente, um token.
            const data = await response.json();

            if (response.ok) {
                // Sucesso! Agora, salve os dados no localStorage.
                // Isso permite que o home.html saiba que o usuário está logado.
                localStorage.setItem('userName', data.username);
                // Você pode adicionar mais dados aqui, como a URL da imagem.
                if (data.avatarUrl) {
                    localStorage.setItem('userImage', data.avatarUrl);
                }

                alert('Login bem-sucedido!');
                window.location.href = 'home.html';
            } else {
                alert('Falha no login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});