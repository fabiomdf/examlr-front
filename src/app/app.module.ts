import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
/** componente principal da aplicacao */
import { AppComponent } from './app.component';
/** compoenentes de servico compartilhado */
import { AuthService } from './user/auth.service';
/** componentes que serao acessados na aplicacao */
import { LoginComponent } from './user/login/login.component';
import { NewuserComponent } from './user/newuser/newuser.component';
import { GroupListComponent } from './group/grouplist.component';
import { GroupNewComponent } from './group/groupnew.component';
import { GroupDetailComponent } from './group/groupdetail.component';
import { GroupSearchComponent } from './group/groupsearch.component';
import { CategoryNewComponent } from './category/categorynew.component';
import { CategorySelectComponent } from './category/categoryselect.component';
import { QuestionListComponent } from './question/questionlist.component';
import { QuestionNewComponent } from './question/questionnew.component';
import { QuestionDetailComponent } from './question/questiondetail.component';
import { AnswerNewComponent } from './answer/answernew.component';
import { SimulationComponent } from './simulation/simulation.component';

/** rotas da aplicacao */
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: GroupListComponent },
  { path: 'group/new', component: GroupNewComponent },
  { path: 'group/:id', component: GroupDetailComponent },
  { path: 'group/:id/simulation', component: SimulationComponent },
  { path: 'search/:term', component: GroupSearchComponent },
  { path: 'user/new', component: NewuserComponent },
  { path: 'user/login', component: LoginComponent }
];

/** modulos ques estao sendo utilizados na aplicacao */
@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupNewComponent,
    GroupDetailComponent,
    GroupSearchComponent,
    CategoryNewComponent,
    CategorySelectComponent,
    QuestionListComponent,
    QuestionNewComponent,
    QuestionDetailComponent,
    AnswerNewComponent,
    SimulationComponent,
    LoginComponent,
    NewuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
