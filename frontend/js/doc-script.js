document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade do botão copiar
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2000);
        });
    });

    // Interação simples de Feedback
    const feedbackBtns = document.querySelectorAll('.feedback-buttons button');
    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove classe ativa de todos e adiciona no clicado
            feedbackBtns.forEach(b => b.style.background = 'transparent');
            this.style.background = 'rgba(140, 180, 255, 0.1)';
            alert("Obrigado pelo feedback!");
        });
    });
});