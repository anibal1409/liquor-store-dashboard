import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { FormComponent } from './form';
import { ReportComponent } from './report';
import { StudiesComponent } from './studies.component';

const routes: Routes = [
  {
    path: '',
    component: StudiesComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiesRoutingModule { }
