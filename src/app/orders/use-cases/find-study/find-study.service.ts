import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import {
  map,
  Observable,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common/memory-repository';
import { order2OrderVM } from '../../mappers';
import { OrderItemVM } from '../../models';

@Injectable()
export class FindStudyService
  implements UseCase<OrderItemVM | null, BaseQuery>
{
  constructor(
    private entityServices: SaleService
  ) { }

  exec(data: BaseQuery): Observable<OrderItemVM> {
    return this.entityServices
    .salesControllerFindOne(data?.id?.toString() || '0')
    .pipe(map(order2OrderVM));
  }
}