import { Request, Response, NextFunction } from 'express';
import SneakerService from '../service/service';

class SneakerController {
  // A injeção de dependência agora é tipada.
  constructor(private sneakerService: SneakerService) {}

  // Tipamos os parâmetros req, res e next para ter acesso total aos seus métodos e propriedades.
  // O retorno é Promise<void> ou Promise<Response> porque a função não retorna um valor,
  // mas sim encerra a requisição.
  public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // req.query é tipado, então sabemos que 'q' pode não existir.
    const { q, limit } = req.query;

    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: 'Parâmetro "q" é obrigatório e deve ser uma string' });
      return;
    }

    const numericLimit = limit ? parseInt(limit as string, 10) : 15;

    try {
      const products = await this.sneakerService.searchProducts(q, numericLimit);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { styleID } = req.params; // styleID é uma string por padrão em req.params
      const product = await this.sneakerService.getProductDetails(styleID);
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  public getPopular = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit } = req.query;
      const numericLimit = limit ? parseInt(limit as string, 10) : 15;
      const products = await this.sneakerService.getPopularProducts(numericLimit);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
}

export default SneakerController;