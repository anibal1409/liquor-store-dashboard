import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common';
import { ExamItemVM } from '../../models';

@Injectable()
export class FindExamService implements UseCase<ExamItemVM | null, BaseQuery>
{
  constructor(
    // private httpService: ExamsService
  ) { }

  exec(data: BaseQuery): Observable<ExamItemVM | null> {
    return of();
    // return this.httpService
    //   .examsControllerFindOne(data?.id?.toString() || '0')
    //   .pipe(map(examToExamVM));
  }
}
