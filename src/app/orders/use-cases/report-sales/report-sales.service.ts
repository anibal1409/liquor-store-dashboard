import { Injectable } from '@angular/core';

import { SaleService } from 'dashboard-sdk';
import { Observable } from 'rxjs';

import { OrderBaseQuery } from '../../models/order-base-query';

@Injectable()
export class ReportSalesService {

  constructor(
    private entityServices: SaleService
  ) { }

  exec(data: OrderBaseQuery): Observable<any> {
    return this.entityServices
    .salesControllerGenerateReport(
      data?.id,
      data?.status,
      data?.customerName,
      data?.stage,
      data?.date,
      data?.categoryId,
      data?.customerId,
      data?.start,
      data?.end,
    );
  }
}
