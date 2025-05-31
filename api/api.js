// backend/index.js
const express = require('express');
const SneaksAPI = require('sneaks-api');
const cors = require('cors');

const app = express();
const sneaks = new SneaksAPI();
const PORT = process.env.PORT || 3000;

app.use(cors());

  // Palavras que geralmente indicam tênis
const isSneaker = (product) => {
  const name = product.shoeName?.toLowerCase() || '';

  // Palavras que indicam roupas ou acessórios
  
  const clothingKeywords = [
     // Roupas
    'jersey', 'shirt', 'tee', 't-shirt', 'long sleeve', 'crewneck',
    'hoodie', 'jacket', 'pants', 'shorts', 'socks', 'sweatshirt',
    'fear of god',

    // Acessórios
    'hat', 'cap', 'beanie', 'glasses', 'sunglasses', 'ring', 'bracelet', 'chain',

    // Bolsas e afins
    'bag', 'backpack', 'pouch', 'tote', 'duffle', 'bandouliere',

    // Itens de viagem / carteira
    'wallet', 'passport', 'cover', 'cardholder', 'card holder'

  ];
  


  return !clothingKeywords.some(keyword => name.includes(keyword));
};



// Buscar produtos por nome (ex: Yeezy, Jordan)
app.get('/search', (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Parâmetro "q" é obrigatório' });

  sneaks.getProducts(query, 600, (err, products) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar produtos' });

    const filtered = products.filter(isSneaker);
    res.json(filtered);
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
  sneaks.getMostPopular(100   , (err, products) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar produtos populares' });

    const filtered = products.filter(isSneaker);
    res.json(filtered);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
