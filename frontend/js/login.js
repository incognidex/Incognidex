document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;

        const payload = {
            username: identifier, // O backend espera a chave 'username'
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Login bem-sucedido!');
                // Redireciona para a página principal após o login
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