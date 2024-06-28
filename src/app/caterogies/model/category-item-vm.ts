import { RowOptionVM } from '../../common';
import { CategoryM } from './category-vm';
import { RowActionCategory } from './row-action';

export interface TypeExamItemVM extends CategoryM {
  statusText?: string;
  options?: {
    options?: Array<RowOptionVM<RowActionCategory>>;
  };
}
