import { Injectable } from '@angular/core';

import {
  finalize,
  Observable,
} from 'rxjs';

import {
  BaseQuery,
  ListComponentService,
} from '../common/memory-repository';
import { FindPatientByDocumentService } from '../customers/use-cases';
import { ProductItemVM } from '../products';
import { GetExamsService } from '../products/use-cases/get-exams';
import { StudyMemoryService } from './memory';
import { SaleItemVM } from './models';
import {
  CreateStudyService,
  DeleteStudyService,
  FindStudyService,
  GetStudiesService,
  ReportSaleService,
  UpdateStudyService,
} from './use-cases';

@Injectable()
export class StudiesService extends ListComponentService<SaleItemVM, BaseQuery> {
  constructor(
    public getEntityService: GetStudiesService,
    public memoryEntityService: StudyMemoryService,
    public createEntityService: CreateStudyService,
    public deleteEntityService: DeleteStudyService,
    public findEntityService: FindStudyService,
    public updateEntityService: UpdateStudyService,
    private findPatientByDocumentService: FindPatientByDocumentService,
    private getExamsService: GetExamsService,
    private reportSaleService: ReportSaleService,
  ) {
    super(
      getEntityService,
      memoryEntityService,
      deleteEntityService,
      createEntityService,
      updateEntityService,
      findEntityService,
    );
  }

  findPatientByDocument$(document: string) {
    this.setLoading(true);
    return this.findPatientByDocumentService.exec(document).pipe(
      finalize(
        () => this.setLoading(false)
      )
    );
  }

  getProducts$(): Observable<Array<ProductItemVM>> {
    return this.getExamsService.exec();
  }

  generateReportSale(data: BaseQuery): Observable<any> {
    return this.reportSaleService.exec(data);
  }
}
