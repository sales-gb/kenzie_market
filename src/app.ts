import express, { Application, json, Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  showProductById,
  showProducts,
  updateProduct,
} from './logic';
import {
  ensureProductExistId,
  ensureProductNameExiste,
  filterProducts,
  formatTotalPrice,
} from './middlewares';

const app: Application = express();
app.use(json());

app.post('/products', formatTotalPrice, ensureProductNameExiste, createProduct);
app.get('/products', filterProducts, formatTotalPrice, showProducts);
app.get('/products/:id', ensureProductExistId, showProductById);
app.patch(
  '/products/:id',
  ensureProductExistId,
  ensureProductNameExiste,
  updateProduct,
);
app.delete('/products/:id', ensureProductExistId, deleteProduct);

const PORT: number = 3000;
const runningMsg: string = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
