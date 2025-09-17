document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

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

            // Adicione esta linha para depurar
            const textResponse = await response.text();
            console.log('Resposta do servidor:', textResponse);

            const data = JSON.parse(textResponse);

            if (response.ok) {
                // ... (o resto do seu código permanece o mesmo)
            } else {
                alert('Falha no login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});