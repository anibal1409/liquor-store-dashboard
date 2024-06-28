import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import { UseCase } from '../../../common';
import { ExamMemoryService } from '../../memory';
import {
  ExamItemVM,
  ExamVM,
} from '../../models';

@Injectable()
export class CreateExamService implements UseCase<ExamItemVM | null, ExamVM> {

  constructor(
    // private httpService: ExamsService,
    private memoryService: ExamMemoryService,
  ) { }

  exec(data: ExamVM): Observable<ExamItemVM> {
    return of();
    // return this.httpService.examsControllerCreate(data)
    //   .pipe(
    //     map(examToExamItemVM),
    //     tap((item) => this.memoryService.create(item)),
    //   );
  }
}