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
import { study2StudyVM } from '../../mappers';
import { SaleItemVM } from '../../models';

@Injectable()
export class FindStudyService
  implements UseCase<SaleItemVM | null, BaseQuery>
{
  constructor(
    private entityServices: SaleService
  ) { }

  exec(data: BaseQuery): Observable<SaleItemVM> {
    return this.entityServices
    .salesControllerFindOne(data?.id?.toString() || '0')
    .pipe(map(study2StudyVM));
  }
}