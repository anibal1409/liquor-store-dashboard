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
export class UpdateExamService implements UseCase<ExamItemVM | null, ExamVM>
{
  constructor(
    // private httpService: ExamsService,
    private memoryService: ExamMemoryService,
  ) { }

  exec(data: ExamVM): Observable<ExamItemVM | null> {
    return of();
    // return this.httpService
    //   .examsControllerUpdate(
    //     data.id?.toString() || '0',
    //     {
    //       name: data.name,
    //       status: !!data.status,
    //       description: data.description,
    //       price: data.price,
    //       typesExam: data.typesExam,
    //       united: data.united,
    //       unitedCheck: data.unitedCheck,
    //       values: data.values,
    //       valuesCheck: data.valuesCheck,
    //     })
    //   .pipe(
    //     map(examToExamItemVM),
    //     tap((item) => {
    //       this.memoryService.update(item);
    //     })
    //   );
  }
}
