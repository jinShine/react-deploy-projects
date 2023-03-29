export interface IProductRegisterInput {
  productName: string;
  price: number;
  remark: string;
  contents: string;
  address: string;
  tags: string;
  images?: string[] | null;
}
