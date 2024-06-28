import { Injectable } from '@angular/core';

import { CustomersService } from 'dashboard-sdk';
import {
  map,
  Observable,
} from 'rxjs';

import { UseCase } from '../../../common';
import { patientToPatientItemVM } from '../../mappers';
import { PatientItemVM } from '../../models';

@Injectable()
export class FindPatientByDocumentService
  implements UseCase<PatientItemVM | null, string>
{
  constructor(private entityServices: CustomersService) { }

  exec(document: string): Observable<PatientItemVM> {
    return this.entityServices.customersControllerFindOneByDocument(document)
      .pipe(map(patientToPatientItemVM));
  }
}
