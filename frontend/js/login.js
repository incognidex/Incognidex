document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Coleta os dados do formulário
        const identifier = document.getElementById('identifier').value;
        const password = document.getElementById('password').value;

        // 2. Prepara o payload (certifique-se que o backend aceita 'username')
        const payload = {
            username: identifier,
            password: password
        };

        try {
            // 3. Envia a requisição para o backend
            const response = await fetch('https://incognidex-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Adicione esta linha para depurar a resposta (pode ser removida depois)
            const textResponse = await response.text();
            console.log('Resposta do servidor:', textResponse);

            let data = {};
            try {
                data = JSON.parse(textResponse);
            } catch (e) {
                // Se o JSON for inválido, assume-se que o erro é do servidor
                console.error('Erro ao analisar JSON da resposta:', e);
                data = { message: 'Resposta inválida ou erro interno do servidor.' };
            }

            if (response.ok) {
                // ===============================================
                // 🎯 LÓGICA DE SUCESSO E REDIRECIONAMENTO 🎯
                // ===============================================

                // 4. Salva o Token JWT e dados do usuário no LocalStorage
                // ASSUMINDO que o backend retorna: { token: '...', username: '...', avatarUrl: '...' }

                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                // Salva outros dados necessários para a página Home
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', data.username || identifier);
                localStorage.setItem('avatarUrl', data.avatarUrl || '');

                // 5. Redireciona para a página Home
                window.location.href = 'home.html';

            } else {
                // 6. Trata falhas de login (ex: credenciais inválidas)
                const errorMessage = data.message || 'Verifique suas credenciais.';
                alert('Falha no login: ' + errorMessage);
            }
        } catch (error) {
            // 7. Trata erros de rede (ex: servidor fora do ar)
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});