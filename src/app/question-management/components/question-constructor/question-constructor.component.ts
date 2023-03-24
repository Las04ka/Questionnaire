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
import { QuestionI } from '../../../shared/models/question';
import { questionsSelector } from '../../../reducers/questions/questions.reducer';
import { types } from '../../../shared/constants';

@Component({
  selector: 'app-question-constructor',
  templateUrl: './question-constructor.component.html',
  styleUrls: ['./question-constructor.component.css'],
})
@AutoUnsubscribe
export class QuestionConstructorComponent implements OnInit {
  types = types;
  question!: QuestionI;
  form: FormGroup;
  id: number;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.id = activeRoute.snapshot.params['id'];
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      options: this.fb.array([]),
    });

    if (this.id) {
      this.store
        .select(questionsSelector)
        .pipe(first())
        .subscribe((questions) => this.form.patchValue(questions[this.id]));
    }
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
  }

  onSubmit(): void {
    if (this.id) {
      this.store.dispatch(deleteQuestion({ id: +this.id }));
    }
    this.question = {
      ...this.form.value,
      answer: null,
      created: Date.now(),
    };
    this.store.dispatch(addQuestion({ question: this.question }));
    this.router.navigateByUrl('management');
  }
  onDeleteOption(i: number): void {
    this.options.removeAt(i);
  }
  onAddOption(): void {
    this.options.push(new FormControl('', Validators.required));
    console.log(this.form.value);
  }

  get options(): FormArray {
    return <FormArray>this.form.get('options');
  }
}
