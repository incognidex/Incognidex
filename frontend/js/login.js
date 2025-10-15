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

            // 1. Leia a resposta do servidor para debug e processamento
            const textResponse = await response.text();
            console.log('Resposta do servidor:', textResponse);
            // Tente analisar a resposta JSON
            let data = {};
            try {
                data = JSON.parse(textResponse);
            } catch (e) {
                console.error('Erro ao analisar JSON:', e);
                // Se a análise falhar, use uma estrutura padrão
                data = { message: 'Resposta inválida do servidor.' };
            }

            if (response.ok) {
                // ===============================================
                // 🎯 LÓGICA DE SUCESSO E REDIRECIONAMENTO 🎯
                // ===============================================

                // 2. Salve o Token (Assumindo que o token JWT venha em data.token)
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                } else {
                    // Se o servidor retornar sucesso, mas sem token, avise o console
                    console.warn('Login bem-sucedido, mas nenhum token foi recebido.');
                }
                
                // 3. Redirecione para a página home
                // Ajuste 'index.html' para o caminho correto da sua página home!
                window.location.href = 'index.html'; 
                
            } else {
                // Lógica de falha de login (ex: status 401 Unauthorized)
                const errorMessage = data.message || 'Verifique suas credenciais.';
                alert('Falha no login: ' + errorMessage);
            }
        } catch (error) {
            // Lógica de erro de rede (ex: servidor indisponível)
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
    });
});