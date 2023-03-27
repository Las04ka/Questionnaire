import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuestionConstructorComponent } from './question-management/components/question-constructor/question-constructor.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: QuestionManagementComponent,
    data: { title: 'Question Management' },
  },
  {
    path: 'management/add',
    component: QuestionConstructorComponent,
    data: { title: 'Add Question' },
  },
  {
    path: 'management/edit/:id',
    component: QuestionConstructorComponent,
    data: { title: 'Edit Question' },
  },
  {
    path: 'list',
    component: QuestionListComponent,
    data: { title: 'Question List' },
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
