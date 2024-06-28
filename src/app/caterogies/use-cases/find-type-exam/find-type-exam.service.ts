import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common/memory-repository';
import { TypeExamItemVM } from '../../model';

@Injectable()
export class FindTypeExamService implements UseCase<TypeExamItemVM | null, BaseQuery>
{
  constructor(
    // private httpService: CategoriesServices
  ) { }

  exec(data: BaseQuery): Observable<TypeExamItemVM | null> {
    return of();
    // return this.httpService
    //   .categoriesControllerFindOne(data?.id || 0)
    //   .pipe(map(typeExam2TypeExamVM));
  }
}
