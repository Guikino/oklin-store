
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import SneaksAPIModule = require('sneaks-api');
console.log('Conteúdo importado de "sneaks-api":', SneaksAPIModule);
import SneakerService, { ISneaksAPI } from './service/service';
import SneakerController from './controller/controller';
import { createSneakerRoutes } from './routes/routes';




const sneaksApiInstance: ISneaksAPI = new SneaksAPIModule();

// O compilador verifica se sneaksApiInstance é compatível com o que SneakerService espera.
const sneakerService = new SneakerService(sneaksApiInstance);

// O compilador verifica se sneakerService é compatível com o que SneakerController espera.
const sneakerController = new SneakerController(sneakerService);

// O compilador verifica se sneakerController é compatível com o que a função de rotas espera.
const sneakerRoutes = createSneakerRoutes(sneakerController);


// --- CONFIGURAÇÃO DO EXPRESS ---
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'http://seu-frontend.com' : '*',
};
app.use(cors(corsOptions));

// --- ROTAS ---
app.use('/api/sneakers', sneakerRoutes);

// --- MIDDLEWARE DE ERRO (com tipos) ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Usar err.stack é melhor para debugar
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});