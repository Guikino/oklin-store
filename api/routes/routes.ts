import { Router } from 'express';
import SneakerController from '../controller/controller';

// A função que cria as rotas espera um SneakerController e retorna um Router.
// Isso garante que só podemos passar um controller compatível.
export const createSneakerRoutes = (controller: SneakerController): Router => {
  const router = Router();

  router.get('/search', controller.search);
  router.get('/product/:styleID', controller.getById);
  router.get('/popular', controller.getPopular);

  return router;
};