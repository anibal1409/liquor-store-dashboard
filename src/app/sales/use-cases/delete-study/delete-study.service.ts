import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import { StudyMemoryService } from '../../memory/study-memory';

@Injectable()
export class DeleteStudyService
implements UseCase<number, number> {
  constructor(
    private entityServices: SaleService,
    private memoryService: StudyMemoryService,
  ) { }

  exec(id: number): Observable<number> {
    return this.entityServices.salesControllerRemove(id.toString()).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
