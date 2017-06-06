import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";

import { GroupListComponent } from "./group/grouplist.component";
import { GroupNewComponent } from "./group/groupnew.component";
import { GroupDetailComponent } from "./group/groupdetail.component";
import { GroupService } from "./group/group.service";

import { CategoryNewComponent } from "./category/categorynew.component";
import { CategorySelectComponent } from "./category/categoryselect.component";
import { CategoryService } from "./category/category.service";

import { QuestionListComponent } from "./question/questionlist.component";
import { QuestionNewComponent } from "./question/questionnew.component";
import { QuestionDetailComponent } from "./question/questiondetail.component";
import { QuestionService } from "./question/question.service";

import { AnswerNewComponent } from "./answer/answernew.component";
import { AnswerService } from "./answer/answer.service";

import { SimulationComponent } from "./simulation/simulation.component";

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupNewComponent,
    GroupDetailComponent,
    CategoryNewComponent,
    CategorySelectComponent,
    QuestionListComponent,
    QuestionNewComponent,
    QuestionDetailComponent,
    AnswerNewComponent,
    SimulationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    GroupService,
    CategoryService,
    QuestionService,
    AnswerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
