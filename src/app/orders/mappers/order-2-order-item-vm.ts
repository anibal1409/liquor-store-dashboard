import { customerToCustomerItemVM } from '../../customers';
import {
  OrderItemVM,
  ORDER_EDIT,
  ORDER_NOT_EDIT,
  OrderVM,
} from '../models';
import {
  STAGE_STUDY_VALUE,
  STAGES_ACTIVES,
} from '../models/stage';
import { order2OrderVM } from './order-2-order-vm';

export function order2OrderItemVM(sale: any): OrderItemVM {
  const studyVM: OrderVM = order2OrderVM(sale);
  const customer = customerToCustomerItemVM(sale?.customer);
  return { 
    ...studyVM,
    customer: customer,
    patientName: customer?.name,
    counterExams: studyVM?.saleProducts?.length || 0,
    stageText: STAGE_STUDY_VALUE[sale?.stage]?.name,
    statusText: sale?.status ? 'Activo' : 'Inactivo',
    options: { 
      options: STAGES_ACTIVES.includes(sale?.stage) ? ORDER_EDIT : ORDER_NOT_EDIT ,
    }
  }; 
}
