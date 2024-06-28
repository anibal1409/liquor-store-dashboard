import { Injectable } from '@angular/core';

import { CustomersService } from 'dashboard-sdk';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import { UseCase } from '../../../common/memory-repository';
import {
  patientToPatientItemVM,
} from '../../mappers/patient-2-patient-item-vm';
import { PatientMemoryService } from '../../memory';
import { PatientItemVM } from '../../models/patient-item-vm';
import { PatientVM } from '../../models/patient-vm';

@Injectable()
export class UpdatePatientService
  implements UseCase<PatientItemVM | null, PatientVM>
{
  constructor(
    private entityServices: CustomersService,
    private memoryService: PatientMemoryService,
  ) { }

  exec(entitySave: PatientVM): Observable<PatientItemVM | null> {
    return this.entityServices
      .customersControllerUpdate(
        entitySave.id?.toString() || '0',
        {
          email: entitySave.email,
          name: `${entitySave.firstName} ${entitySave.lastName}`,
          idDocument: entitySave.idDocument,
          status: entitySave.status,
          phone: entitySave.phone,
          address: entitySave.firstName,
        }
      )
      .pipe(
        map(patientToPatientItemVM),
        tap((entity) => {
          this.memoryService.update(entity);
        })
      );
  }
}
