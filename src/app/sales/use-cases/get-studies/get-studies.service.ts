import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common/memory-repository';
import { study2StudyItemVM } from '../../mappers';
import { StudyMemoryService } from '../../memory/study-memory';
import { SaleItemVM } from '../../models';

@Injectable()
export class GetStudiesService
  implements UseCase<Array<SaleItemVM> | null, BaseQuery> {

  constructor(
    private entityServices: SaleService,
    private memoryService: StudyMemoryService,
  ) { }

  exec(data: BaseQuery = {}): Observable<Array<SaleItemVM>> {
    return this.entityServices.salesControllerFindAll()
      .pipe(
        map((entities: any) => entities.map(study2StudyItemVM)),
        tap((entity) => {
          this.memoryService.setDataSource(entity);
        })
      );
  }
}