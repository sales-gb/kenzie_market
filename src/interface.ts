interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: 'food' | 'cleaning';
  expirationDate: Date;
}
interface ICleaningProduct extends IProduct {}
interface IFoodProduct extends IProduct {
  calories: number;
}
export { IProduct, ICleaningProduct, IFoodProduct };

export type TProductRequest = Omit<IProduct, 'id'>;
