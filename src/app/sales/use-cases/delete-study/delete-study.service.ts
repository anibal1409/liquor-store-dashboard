import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import { StudyMemoryService } from '../../memory/study-memory';

@Injectable()
export class DeleteStudyService
implements UseCase<number, number> {
  constructor(
    // private entityServices: StudiesService,
    private memoryService: StudyMemoryService,
  ) { }

  exec(id: number): Observable<number> {
    return of();
    // return this.entityServices.studiesControllerRemove(id.toString()).pipe(
    //   map(() => 1),
    //   tap(() => {
    //     this.memoryService.delete(id);
    //   })
    // );
  }
}
