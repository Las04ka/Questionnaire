import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { QuestionI } from '../../../shared/models/question';
import { AppState } from '../../../reducers';
import { answerQuestion } from '../../../reducers/questions/questions.actions';

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css'],
})
export class OpenQuestionComponent implements OnInit {
  @Input() question!: QuestionI;
  @Input() id!: number;
  form!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.question.answer) {
      this.form.patchValue({ answer: this.question.answer });
      this.form.disable();
    }
  }

  onSubmit(): void {
    this.store.dispatch(
      answerQuestion({
        id: this.id,
        answer: this.form.controls['answer'].value,
      }),
    );
  }
}
