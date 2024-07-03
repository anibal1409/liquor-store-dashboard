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
import {
  OrderItemVM,
  OrderVM,
} from '../../models';

@Injectable()
export class CreateStudyService
  implements UseCase<OrderItemVM, OrderVM>
{
  constructor(
    private entityServices: SaleService,
    private memoryService: OrderMemoryService,
  ) { }

  exec(entitySave: OrderVM): Observable<OrderItemVM> {
    return this.entityServices
      .salesControllerCreate({
        date: entitySave.date,
        note: entitySave.note,
        total: +entitySave.total,
        customer: { id: entitySave.customerId },
        stage: entitySave.stage,
        saleProducts: entitySave.saleProducts.map((x) => ({
          product: { id: x.productId },
          price: +x.price,
          amount: +x.amount,
          subtotal: +x.subtotal
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
