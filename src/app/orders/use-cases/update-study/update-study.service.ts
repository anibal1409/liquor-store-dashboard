import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import { order2OrderItemVM } from '../../mappers';
import { OrderMemoryService } from '../../memory';
import { OrderVM } from '../../models';
import { OrderItemVM } from '../../models/order-item-vm';

@Injectable()
export class UpdateStudyService
  implements UseCase<OrderItemVM | null, OrderVM>
{
  constructor(
    private entityServices: SaleService,
    private memoryService: OrderMemoryService,
  ) { }

  exec(entitySave: OrderVM): Observable<OrderItemVM> {
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
        map(order2OrderItemVM),
        tap((entity) => {
          this.memoryService.create(entity);
        })
      );
  }
}