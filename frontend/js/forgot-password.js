document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const payload = { email: email };

        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.text();

            if (response.ok) {
                alert('Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado para ele.');
            } else {
                alert(`Erro: ${result}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível se conectar ao servidor.');
        }
    });
});