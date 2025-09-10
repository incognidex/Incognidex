document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        alert('Token de redefinição não encontrado.');
        window.location.href = 'forgot-password.html';
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

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
                alert('Senha redefinida com sucesso! Você pode fazer login com a nova senha.');
                window.location.href = 'login.html';
            } else {
                alert(`Erro: ${result}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível se conectar ao servidor.');
        }
    });
});