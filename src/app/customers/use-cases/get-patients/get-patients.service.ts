import { Injectable } from '@angular/core';

import { CustomersService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import {
  BaseQuery,
  UseCase,
} from '../../../common/memory-repository';
import {
  patientToPatientItemVM,
} from '../../mappers/patient-2-patient-item-vm';
import { PatientMemoryService } from '../../memory';
import { PatientItemVM } from '../../models/patient-item-vm';

@Injectable()
export class GetPatientsService
  implements UseCase<Array<PatientItemVM> | null, BaseQuery> {

  constructor(
    private entityServices: CustomersService,
    private memoryService: PatientMemoryService,
  ) { }

  exec(data: BaseQuery = {}): Observable<Array<PatientItemVM>> {
    return this.entityServices.customersControllerFindAll()
      .pipe(
        map((entities: any) => entities.map(patientToPatientItemVM)),
        tap((entity) => {
          this.memoryService.setDataSource(entity);
        })
      );
  }
}
