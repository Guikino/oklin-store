// backend/index.js
const express = require('express');
const SneaksAPI = require('sneaks-api');
const cors = require('cors');

const app = express();
const sneaks = new SneaksAPI();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Buscar produtos por nome (ex: Yeezy, Jordan)
app.get('/search', (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Parâmetro "q" é obrigatório' });

  sneaks.getProducts(query, 10, (err, products) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar produtos' });
    res.json(products);
  });
});

// Buscar preços e detalhes por styleID
app.get('/product/:styleID', (req, res) => {
  const { styleID } = req.params;
  sneaks.getProductPrices(styleID, (err, product) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar detalhes do produto' });
    res.json(product);
  });
});

// Produtos mais populares
app.get('/popular', (req, res) => {
  sneaks.getMostPopular(10, (err, products) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar produtos populares' });
    res.json(products);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
