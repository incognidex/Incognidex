const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Nova rota para o ping
app.get('/ping', (req, res) => {
    // Responde com um status de sucesso
    res.status(200).send('Serviço ativo');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});