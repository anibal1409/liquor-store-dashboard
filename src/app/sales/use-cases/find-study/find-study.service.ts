import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common/memory-repository';
import { StudyItemVM } from '../../models';

@Injectable()
export class FindStudyService
  implements UseCase<StudyItemVM | null, BaseQuery>
{
  constructor(
    // private entityServices: StudiesService
  ) { }

  exec(data: BaseQuery): Observable<StudyItemVM> {
    return of();
    // return this.entityServices
    // .studiesControllerFindOne(data?.id?.toString() || '0').
    // .pipe(map(study2StudyVM));
  }
}