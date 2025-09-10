document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    const messageDisplay = document.getElementById('messageDisplay'); // Crie uma <span> ou <div> no seu HTML com este ID

    // Verifica se o formulário existe antes de adicionar o event listener
    if (form) {
        form.addEventListener('submit', async (event) => {
            // Previne o comportamento padrão do formulário, que é recarregar a página
            event.preventDefault();

            // Adiciona um feedback visual de que a requisição está em andamento
            if (messageDisplay) {
                messageDisplay.textContent = 'Enviando...';
                messageDisplay.style.color = 'blue';
            }

            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true; // Desabilita o botão para evitar cliques múltiplos
            }

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
                    if (messageDisplay) {
                        messageDisplay.textContent = 'Se o e-mail estiver cadastrado, um link de redefinição de senha foi enviado para ele.';
                        messageDisplay.style.color = 'green';
                    }
                } else {
                    if (messageDisplay) {
                        messageDisplay.textContent = `Erro: ${result}`;
                        messageDisplay.style.color = 'red';
                    }
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                if (messageDisplay) {
                    messageDisplay.textContent = 'Não foi possível se conectar ao servidor.';
                    messageDisplay.style.color = 'red';
                }
            } finally {
                // Reabilita o botão, independentemente do sucesso ou falha da requisição
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }
});