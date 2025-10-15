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

            let data = {};
            try {
                data = JSON.parse(textResponse);
            } catch (e) {
                console.error('Erro ao analisar JSON da resposta:', e);
                data = { message: 'Resposta inválida ou erro interno do servidor.' };
            }

            if (response.ok) {
                // ===============================================
                // 🎯 CÓDIGO FALTANDO: SALVAR DADOS E REDIRECIONAR 🎯
                // ===============================================

                // 1. Salva o Token JWT (necessário para autenticar requisições futuras)
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                // 2. Salva os dados do usuário para exibição na Home
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', data.username || identifier);
                localStorage.setItem('avatarUrl', data.avatarUrl || '');

                // 3. Redireciona para a página Home
                window.location.href = 'home.html'; 

            } else {
                const errorMessage = data.message || 'Verifique suas credenciais.';
                alert('Falha no login: ' + errorMessage);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});