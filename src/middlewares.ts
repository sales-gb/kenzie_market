import { NextFunction, Request, Response } from 'express';
import market from './database';
import { IProduct, TProductRequest } from './interface';

const ensureProductExistId = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const id: number = Number(req.params.id);

  const findIndex = market.findIndex((prod) => prod.id === id);

  if (findIndex === -1) {
    return res.status(404).json({
      error: 'Product not found',
    });
  }

  res.locals.product = {
    idProduct: id,
    idxProduct: findIndex,
  };

  return next();
};

const ensureProductNameExiste = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const productData: TProductRequest | TProductRequest[] = req.body;
  const productIsAnArray = Array.isArray(productData)
    ? productData
    : [productData];

  for (const product of productIsAnArray) {
    if (market.find((pName) => pName.name === product.name)) {
      return res.status(409).json({
        error: 'Product alredy exists.',
      });
    }
  }
  res.locals.products = productIsAnArray;

  return next();
};

const filterProducts = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { section } = req.query;

  const filterSection: IProduct[] = market.filter(
    (product) => product.section === section,
  );

  if (filterSection.length > 0) {
    res.locals.filteredProducts = filterSection;
    return next();
  }

  res.locals.filteredProducts = market;
  return next();
};

const formatTotalPrice = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const total = market.reduce((acc, product) => acc + product.price, 0);

  res.locals.TotalPrice = total;
  return next();
};

export {
  ensureProductExistId,
  ensureProductNameExiste,
  filterProducts,
  formatTotalPrice,
};
