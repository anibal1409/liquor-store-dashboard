import { RowOptionVM } from '../../common/table';
import { OrderVM } from './order-vm';
import { RowActionOrder } from './row-action';

export interface OrderItemVM extends OrderVM { 
  statusText?: string;
  patientName?: string;
  counterExams?: number;
  stageText?: string;
  options?: { 
    options?: Array<RowOptionVM<RowActionOrder>>; 
  }; 
}
