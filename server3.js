const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const port = 3000;

app.use(cors()); // Adiciona o middleware CORS
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'produtos'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para criar um novo produto
app.post('/produtos', (req, res) => {
  const { descricao, quantidade, valor } = req.body;
  const sql = 'INSERT INTO produtos (descricao, quantidade, valor) VALUES (?, ?, ?)';
  db.query(sql, [descricao, quantidade, valor], (err, result) => {
    if (err) {
      console.error('Erro ao inserir produto:', err);
      res.status(500).send('Erro ao inserir produto');
      return;
    }
    res.status(201).send('Produto adicionado com sucesso');
  });
});

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).send('Erro ao buscar produtos');
      return;
    }
    res.status(200).json(results);
  });
});

// Rota para atualizar um produto
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade, valor } = req.body;
  const sql = 'UPDATE produtos SET descricao = ?, quantidade = ?, valor = ? WHERE id = ?';
  db.query(sql, [descricao, quantidade, valor, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).send('Erro ao atualizar produto');
      return;
    }
    res.send('Produto atualizado com sucesso');
  });
});

// Rota para deletar um produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).send('Erro ao deletar produto');
      return;
    }
    res.send('Produto deletado com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});