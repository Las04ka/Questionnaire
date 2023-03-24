import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { QuestionI } from '../../../shared/models/question';
import { AppState } from '../../../reducers';
import { answerQuestion } from '../../../reducers/questions/questions.actions';

@Component({
  selector: 'app-multi-question',
  templateUrl: './multi-question.component.html',
  styleUrls: ['./multi-question.component.css'],
})
export class MultiQuestionComponent implements OnInit {
  @Input() question!: QuestionI;
  @Input() id!: number;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.form = this.formBuilder.group(
      {},
      { validators: this.notNullValidator() },
    );
  }

  ngOnInit(): void {
    this.question.options.forEach((option) => {
      this.form.addControl(option, new FormControl(false));
    });
  }

  onSubmit(): void {
    const selectedAnswers = Object.keys(this.form.value)
      .filter((key) => this.form.value[key])
      .join(', ');
    this.store.dispatch(
      answerQuestion({ id: this.id, answer: selectedAnswers }),
    );
  }

  notNullValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedValues = Object.values(control.value);
      const atLeastOneSelected = selectedValues.some((val) => val === true);
      return atLeastOneSelected ? null : { atLeastOneSelected: true };
    };
  }
}
