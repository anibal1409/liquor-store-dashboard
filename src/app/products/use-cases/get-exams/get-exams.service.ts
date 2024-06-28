import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common';
import { ExamMemoryService } from '../../memory';
import { ExamItemVM } from '../../models';

@Injectable()
export class GetExamsService implements UseCase<Array<ExamItemVM> | null, BaseQuery> {

  constructor(
    // private httpService: ExamsService,
    private memoryService: ExamMemoryService,
  ) {}

  exec(): Observable<Array<ExamItemVM>> {
    return of();
    // return this.httpService.examsControllerFindAll()
    // .pipe(
    //   map((items: any) => items.map(examToExamItemVM)),
    //   tap((items) => {
    //     this.memoryService.setDataSource(items);
    //   })
    // );
  }
}