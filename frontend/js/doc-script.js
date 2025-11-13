document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================================================
       1. FUNCIONALIDADE DOS BOTÕES DE CÓDIGO (COPIAR)
       ================================================================== */
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            
            // Encontra o elemento <code> dentro do mesmo bloco
            const codeBlock = btn.closest('.code-block');
            const codeText = codeBlock ? codeBlock.querySelector('code').innerText : '';

            // Copia para a área de transferência
            navigator.clipboard.writeText(codeText).then(() => {
                btn.innerText = 'Copied!';
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
            });
        });
    });

    /* ==================================================================
       2. INTERAÇÃO DOS BOTÕES DE FEEDBACK
       ================================================================== */
    const feedbackBtns = document.querySelectorAll('.feedback-buttons button');
    
    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove fundo de todos e adiciona no clicado
            feedbackBtns.forEach(b => b.style.background = 'transparent');
            this.style.background = 'rgba(140, 180, 255, 0.1)';
            alert("Obrigado pelo feedback!");
        });
    });

    /* ==================================================================
       3. NAVEGAÇÃO AUTOMÁTICA (SEM ALTERAR HTML)
       ================================================================== */
    
    // Seleciona todos os itens da lista na sidebar e todos os títulos do texto
    const sidebarItems = document.querySelectorAll('.sidebar-left li');
    const contentHeadings = document.querySelectorAll('main.content h1, main.content h2, main.content h3');

    sidebarItems.forEach(item => {
        // Deixa o cursor como "mãozinha" para indicar que é clicável
        item.style.cursor = 'pointer';

        item.addEventListener('click', () => {
            // 1. Pega o texto do item clicado, limpa espaços e remove o ">"
            const sidebarText = item.innerText.replace('>', '').trim().toLowerCase();

            let targetFound = null;

            // 2. Procura um título no texto principal que contenha essas palavras
            for (let heading of contentHeadings) {
                const headingText = heading.innerText.toLowerCase();

                // Verifica se o texto do menu está dentro do título ou vice-versa
                // Ex: Menu "Ciclo de Vida" encontra Título "1. O Ciclo de Vida (SDLC)"
                if (headingText.includes(sidebarText) || sidebarText.includes(headingText)) {
                    targetFound = heading;
                    break; // Para de procurar assim que achar o primeiro
                }
            }

            // 3. Se achou, rola a página até lá
            if (targetFound) {
                targetFound.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinha o título no topo da tela
                });

                // (Opcional) Atualiza a cor do item ativo no menu
                sidebarItems.forEach(li => li.classList.remove('active'));
                item.classList.add('active');
            } else {
                console.log('Nenhum título correspondente encontrado para:', sidebarText);
            }
        });
    });

});