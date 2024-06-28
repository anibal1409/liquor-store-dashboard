import { Injectable } from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import { StudyMemoryService } from '../../memory';
import { StudyVM } from '../../models';
import { StudyItemVM } from '../../models/study-item-vm';

@Injectable()
export class UpdateStudyService
  implements UseCase<StudyItemVM | null, StudyVM>
{
  constructor(
    // private entityServices: StudiesService,
    private memoryService: StudyMemoryService,
  ) { }

  exec(entitySave: StudyVM): Observable<StudyItemVM> {
    return of();
    // return this.entityServices
    //   .studiesControllerUpdate(
    //     entitySave.id?.toString() || '0',
    //     {
    //       date: entitySave.date,
    //       note: entitySave.note,
    //       total: entitySave.total,
    //       patient: { id: entitySave.patientId },
    //       sendEmail: entitySave.sendEmail,
    //       stage: entitySave.stage,
    //       studyExams: entitySave.studyExams.map((x) => ({
    //         id: x.id,
    //         exam: { id: x.examId },
    //         value: x.value,
    //       })) as any,
    //     }
    //   )
    //   .pipe(
    //     map(study2StudyItemVM),
    //     tap((entity) => {
    //       this.memoryService.create(entity);
    //     })
    //   );
  }
}