// A importação de SneaksAPI aqui não é estritamente necessária, pois ISneaksAPI é uma definição estrutural.

// --- Interfaces de Tipagem ---
// Definimos como esperamos que os objetos de tênis sejam.
export interface SneakerProduct {
  styleID: string;
  shoeName: string;
  brand: string;
  thumbnail: string;
  [key: string]: any; // Permite outras propriedades
}

export interface SneakerProductDetails extends SneakerProduct {
  resellPrices: object;
  lowestResellPrice: object;
  [key: string]: any;
}

// Criamos uma interface para a biblioteca SneaksAPI para facilitar
// a injeção de dependência e os testes (mocking).
export interface ISneaksAPI {
  getProducts(keyword: string, limit: number, callback: (err: Error | null, products: SneakerProduct[]) => void): void;
  getProductPrices(styleID: string, callback: (err: Error | null, product: SneakerProductDetails) => void): void;
  getMostPopular(limit: number, callback: (err: Error | null, products: SneakerProduct[]) => void): void;
}


// O serviço agora está fortemente tipado.
class SneakerService {
  // O construtor espera algo que satisfaça a interface ISneaksAPI.
  // Usar "private" no parâmetro é um atalho do TS para criar e atribuir a propriedade.
  constructor(private sneaks: ISneaksAPI) {}

  // Usamos Generics para o _promisify, tornando-o reutilizável e seguro em tipo.
  private _promisify<T>(fn: (...args: any[]) => void): (...args: any[]) => Promise<T> {
    return (...args: any[]) => {
      return new Promise((resolve, reject) => {
        // O último argumento para a função original é sempre o nosso callback
        fn(...args, (err: Error | null, result: T) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    };
  }
  
  // Os métodos agora retornam Promises com tipos específicos.
  public async searchProducts(query: string, limit: number = 15): Promise<SneakerProduct[]> {
    const getProductsAsync = this._promisify<SneakerProduct[]>(this.sneaks.getProducts.bind(this.sneaks));
    return getProductsAsync(query, limit);
  }

  public async getProductDetails(styleID: string): Promise<SneakerProductDetails> {
    const getProductPricesAsync = this._promisify<SneakerProductDetails>(this.sneaks.getProductPrices.bind(this.sneaks));
    return getProductPricesAsync(styleID);
  }

  public async getPopularProducts(limit: number = 15): Promise<SneakerProduct[]> {
    const getMostPopularAsync = this._promisify<SneakerProduct[]>(this.sneaks.getMostPopular.bind(this.sneaks));
    return getMostPopularAsync(limit);
  }
}

export default SneakerService;