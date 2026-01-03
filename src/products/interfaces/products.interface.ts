export interface ProductInterface {
  id: string;
  price: number;
  title: string;
}
export interface UpdateProductDto {
  title?: string;
  price?: number;
}
