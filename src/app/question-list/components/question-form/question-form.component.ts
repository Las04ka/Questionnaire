import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../reducers';
import { answerQuestion } from '../../../reducers/questions/questions.actions';
import { QuestionType } from '../../../shared/constants';
import { IQuestion } from '../../../shared/models/question';
import { notNullValidator } from './not-null-validator';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit {
  @Input() question!: IQuestion;
  QuestionType = QuestionType;
  form: FormGroup;
  private answer!: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    if (this.question.type === this.QuestionType.Multi) {
      this.question.options.forEach((option) => {
        this.form.addControl(option, new FormControl(false));
      });
      this.form.setValidators(notNullValidator());
    } else {
      this.form.addControl('answer', new FormControl('', Validators.required));
    }
  }

  onSubmit(): void {
    if (this.question.type === this.QuestionType.Multi) {
      this.answer = Object.keys(this.form.value)
        .filter((key) => this.form.value[key])
        .join(', ');
    } else this.answer = this.form.controls['answer'].value;
    this.store.dispatch(
      answerQuestion({ created: this.question.created, answer: this.answer }),
    );
  }
}
