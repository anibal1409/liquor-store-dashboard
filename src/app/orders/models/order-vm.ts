import { CustomerItemVM } from '../../customers/models';
import { ProductVM } from '../../products';

export interface OrderVM {
  id?: number;
  stage: string;
  date: string;
  note?: string;
  total: number;
  customerId: number;
  saleProducts: Array<OrderProduct>;
  status: boolean;
  customer?: CustomerItemVM;
}

export interface OrderProduct {
  id: number;
  productId: number;
  price: number;
  amount: number;
  subtotal: number;
  product?: ProductVM;
}

