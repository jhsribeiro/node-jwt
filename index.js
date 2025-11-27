const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Chave secreta para assinar o JWT. 
// Em um projeto real, isso DEVE estar em uma variável de ambiente (.env)!
const JWT_SECRET = 'sua_senha_aqui';

app.use(express.json());

// Banco de dados de usuários
const usuarios = [
    { id: 1, usuario: "admin", senha: "123" },
    { id: 2, usuario: "jjwxz", senha: "12011" }
];

// Rotas

// Rota de login para gerar o token JWT
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // 1. Encontrar o usuário no bd
    const user = usuarios.find(u => u.usuario === usuario);

    // 2. Verificar se o usuário existe e a senha está correta
    if (!user || user.senha !== senha) {
        return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }

    // 3. Se as credenciais estiverem certas, gerar o token JWT
    const token = jwt.sign({ userId: user.id, usuario: user.usuario }, JWT_SECRET, { expiresIn: '15m' });

    // 4. Enviar o token para o cliente
    res.json({ mensagem: 'Login bem-sucedido', token: token });
});


// SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});