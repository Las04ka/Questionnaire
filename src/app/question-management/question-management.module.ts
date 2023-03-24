import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionConstructorModule } from './components/question-constructor/question-constructor.module';
import { QuestionManagementComponent } from './question-management.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [QuestionManagementComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionConstructorModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatDialogModule,
  ],
  exports: [QuestionManagementComponent],
})
export class QuestionManagementModule {}
