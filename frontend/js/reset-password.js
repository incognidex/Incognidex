document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    const messageDisplay = document.getElementById('messageDisplay');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Obtenha o token da URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        // 2. Obtenha a nova senha e a confirmação
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // 3. Valide as senhas no front-end
        if (newPassword !== confirmPassword) {
            if (messageDisplay) {
                messageDisplay.textContent = 'As senhas não coincidem!';
                messageDisplay.style.color = 'red';
            }
            return;
        }

        // 4. Crie o payload com o token e a nova senha
        const payload = {
            token: token,
            newPassword: newPassword
        };
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.text();
            
            if (response.ok) {
                if (messageDisplay) {
                    messageDisplay.textContent = 'Senha redefinida com sucesso!';
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
        }
    });
});