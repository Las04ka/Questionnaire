import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';

import {
  addQuestion,
  deleteQuestion,
} from '../../../reducers/questions/questions.actions';
import { AppState } from '../../../reducers';
import { AutoUnsubscribe } from '../../../shared/decorators/unsubscriber';
import { IQuestion } from '../../../shared/models/question';
import { questionsSelector } from '../../../reducers/questions/questions.reducer';
import { QuestionType } from '../../../shared/constants';

@Component({
  selector: 'app-question-constructor',
  templateUrl: './question-constructor.component.html',
  styleUrls: ['./question-constructor.component.css'],
})
@AutoUnsubscribe
export class QuestionConstructorComponent implements OnInit {
  types = Object.values(QuestionType);
  question!: IQuestion;
  form!: FormGroup;
  created!: number;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.created = this.activeRoute.snapshot.params['id'];
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      options: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe((type) => {
      if (type === 'open') {
        this.form.setControl('options', this.fb.array([]));
        this.options.clearValidators();
        this.options.updateValueAndValidity();
      } else {
        this.form.setControl(
          'options',
          this.fb.array([
            new FormControl('', Validators.required),
            new FormControl('', Validators.required),
          ]),
        );
        this.options.setValidators(Validators.required);
        this.form.get('options')?.updateValueAndValidity();
      }
    });

    if (this.created) {
      this.store
        .select(questionsSelector)
        .pipe(first())
        .subscribe((questions) => {
          questions.map((question) => {
            if (question.created == this.created) {
              this.form.patchValue(question);
            }
          });
        });
    }
  }

  onSubmit(): void {
    if (this.created) {
      this.store.dispatch(deleteQuestion({ created: +this.created }));
    }
    this.question = {
      ...this.form.value,
      answer: null,
    };
    this.store.dispatch(addQuestion({ question: this.question }));
    this.router.navigateByUrl('management');
  }
  onDeleteOption(i: number): void {
    this.options.removeAt(i);
  }
  onAddOption(): void {
    this.options.push(new FormControl('', Validators.required));
  }

  get options(): FormArray {
    return <FormArray>this.form.get('options');
  }
}
