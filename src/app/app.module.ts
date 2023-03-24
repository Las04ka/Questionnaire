import { NgModule, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionListModule } from './question-list/question-list.module';
import { QuestionManagementModule } from './question-management/question-management.module';
import { QuestionsReducer } from './reducers/questions/questions.reducer';
import { metaReducers } from './reducers';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionListModule,
    QuestionManagementModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(
      {
        questions: QuestionsReducer,
      },
      {
        metaReducers,
      },
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MatIconModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
