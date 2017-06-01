import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupListComponent } from "./group/grouplist.component";
import { GroupNewComponent } from "./group/groupnew.component";
import { GroupDetailComponent } from "./group/groupdetail.component";
import { CategoryNewComponent } from "./category/categorynew.component";
import { SimulationComponent } from "./simulation/simulation.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: GroupListComponent },
  { path: 'group/new', component: GroupNewComponent },
  { path: 'group/:id', component: GroupDetailComponent },
  { path: 'group/:id/simulation', component: SimulationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }