import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { QuestionListComponent } from './question-list.component';
import { OpenQuestionComponent } from './components/open-question/open-question.component';
import { SingleQuestionComponent } from './components/single-question/single-question.component';
import { MultiQuestionComponent } from './components/multi-question/multi-question.component';

@NgModule({
  declarations: [
    QuestionListComponent,
    OpenQuestionComponent,
    SingleQuestionComponent,
    MultiQuestionComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  exports: [QuestionListComponent],
})
export class QuestionListModule {}
