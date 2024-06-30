import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import { study2StudyItemVM } from '../../mappers';
import { StudyMemoryService } from '../../memory';
import { SaleVM } from '../../models';
import { SaleItemVM } from '../../models/sale-item-vm';

@Injectable()
export class UpdateStudyService
  implements UseCase<SaleItemVM | null, SaleVM>
{
  constructor(
    private entityServices: SaleService,
    private memoryService: StudyMemoryService,
  ) { }

  exec(entitySave: SaleVM): Observable<SaleItemVM> {
    console.log(entitySave);
    
    return this.entityServices
      .salesControllerUpdate(
        entitySave.id?.toString() || '0',
        {
          date: entitySave.date,
          note: entitySave.note,
          total: +entitySave.total,
          customer: { id: entitySave.customerId },
          stage: entitySave.stage,
          saleProducts: entitySave.saleProducts.map((x) => ({
            id: x.id,
            product: { id: x.productId },
            price: +x.price,
            amount: +x.amount,
            subtotal: +x.subtotal,
          })) as any,
        }
      )
      .pipe(
        map(study2StudyItemVM),
        tap((entity) => {
          this.memoryService.create(entity);
        })
      );
  }
}