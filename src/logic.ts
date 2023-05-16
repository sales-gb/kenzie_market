import { Request, Response } from 'express';
import market from './database';
import {
  IProduct,
  ICleaningProduct,
  IFoodProduct,
  TProductRequest,
} from './interface';

let productId = 1;

const createProduct = (req: Request, res: Response): Response => {
  const products = res.locals.products as TProductRequest[];

  const newProducts = products.map((product) => {
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(currentDate.getFullYear() + 1);

    const newProduct: IProduct = {
      id: productId++,
      ...product,
      expirationDate,
    };

    market.push(newProduct);
    return newProduct;
  });
  const total: number = res.locals.TotalPrice;

  return res.status(201).json({ total, marketProducts: newProducts });
};

const showProducts = (req: Request, res: Response): Response => {
  const products: IProduct = res.locals.filteredProducts;
  const total: number = res.locals.TotalPrice;

  return res.json({ total, marketProducts: products });
};

const showProductById = (req: Request, res: Response): Response => {
  const idx: number = res.locals.product.idxProduct;

  return res.json(market[idx]);
};

const updateProduct = (req: Request, res: Response): Response => {
  const idx: number = res.locals.product.idxProduct;

  const actualProduct:
    | Pick<IProduct, 'name' | 'price' | 'weight'>
    | Pick<IFoodProduct, 'name' | 'price' | 'weight' | 'calories'> =
    market[idx];

  const updateProductInfos = req.body;

  const updateProduct = {
    ...actualProduct,
    ...updateProductInfos,
  };

  market[idx] = updateProduct;

  return res.status(200).json(updateProduct);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const idx: number = res.locals.product.idxProduct;
  market.splice(idx, 1);

  return res.status(204).send();
};

export {
  createProduct,
  showProducts,
  showProductById,
  updateProduct,
  deleteProduct,
};
