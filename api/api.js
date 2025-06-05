const express = require('express');
const SneaksAPI = require('sneaks-api');
const cors = require('cors');

const app = express();
const sneaks = new SneaksAPI();

// Usar uma variável de ambiente para a porta é uma ótima prática!
const PORT = process.env.PORT || 3000;

// --- Melhorias de Segurança ---
// Configure o CORS de forma mais segura para produção.
// Substitua 'http://seu-frontend.com' pela URL real do seu aplicativo cliente.
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'http://seu-frontend.com' : '*',
};
app.use(cors(corsOptions));

// Middleware para parsear JSON (útil para futuras rotas POST/PUT)
app.use(express.json());


// --- Rotas Refatoradas com Async/Await ---

// Buscar produtos por nome (ex: Yeezy, Jordan)
app.get('/search', async (req, res, next) => {
  const { q, limit = 10 } = req.query; // Pega 'q' e 'limit', com valor padrão para limit
  if (!q) {
    return res.status(400).json({ error: 'Parâmetro "q" é obrigatório' });
  }

  try {
    // A biblioteca usa callbacks, então a envolvemos em uma Promise para usar async/await
    const products = await new Promise((resolve, reject) => {
      sneaks.getProducts(q, parseInt(limit), (err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
    });
    res.json(products);
  } catch (error) {
    // Passa o erro para o middleware de tratamento de erros
    next(error);
  }
});

// Buscar preços e detalhes por styleID
app.get('/product/:styleID', async (req, res, next) => {
  try {
    const { styleID } = req.params;
    const product = await new Promise((resolve, reject) => {
      sneaks.getProductPrices(styleID, (err, product) => {
        if (err) return reject(err);
        resolve(product);
      });
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Produtos mais populares
app.get('/popular', async (req, res, next) => {
  // Tornando o limite de produtos um parâmetro flexível
  const { limit = 10 } = req.query;
  try {
    const products = await new Promise((resolve, reject) => {
      sneaks.getMostPopular(parseInt(limit), (err, products) => {
        if (err) return reject(err);
        resolve(products);
      });
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});


// --- Middleware de Tratamento de Erros Centralizado ---
// Este middleware captura erros de qualquer rota, evitando repetição de código.
app.use((err, req, res, next) => {
  console.error(err.message); // Loga o erro no console do servidor
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});