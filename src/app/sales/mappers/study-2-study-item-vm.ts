import { customerToCustomerItemVM } from '../../customers';
import {
  SALE_EDIT,
  SALE_NOT_EDIT,
  SaleItemVM,
  SaleVM,
} from '../models';
import {
  STAGE_STUDY_VALUE,
  STAGES_ACTIVES,
} from '../models/stage';
import { study2StudyVM } from './study-2-study-vm';

export function study2StudyItemVM(sale: any): SaleItemVM {
  const studyVM: SaleVM = study2StudyVM(sale);
  const customer = customerToCustomerItemVM(sale?.customer);
  return { 
    ...studyVM,
    customer: customer,
    patientName: customer?.name,
    counterExams: studyVM?.saleProducts?.length || 0,
    stageText: STAGE_STUDY_VALUE[sale?.stage]?.name,
    statusText: sale?.status ? 'Activo' : 'Inactivo',
    options: { 
      options: STAGES_ACTIVES.includes(sale?.stage) ? SALE_EDIT : SALE_NOT_EDIT ,
    }
  }; 
}
