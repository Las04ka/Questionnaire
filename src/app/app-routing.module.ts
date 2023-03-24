import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuestionConstructorComponent } from './question-management/components/question-constructor/question-constructor.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: QuestionManagementComponent,
  },
  {
    path: 'management/add',
    component: QuestionConstructorComponent,
  },
  {
    path: 'management/edit/:id',
    component: QuestionConstructorComponent,
  },
  {
    path: 'list',
    component: QuestionListComponent,
  },
  {
    path: '**',
    redirectTo: 'management',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
