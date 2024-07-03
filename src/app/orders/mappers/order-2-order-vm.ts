import { customerToCustomerItemVM } from '../../customers/mappers';
import { OrderVM } from '../models';

export function order2OrderVM(sale: any): OrderVM {
  const customer = customerToCustomerItemVM(sale?.customer);
  return {
    date: sale.date,
    customer: customer,
    customerId: sale.customer?.id,
    stage: sale.stage,
    status: sale.status,
    total: sale.total,
    id: sale.id,
    note: sale.note,
    saleProducts: sale.saleProducts,
  };
}
