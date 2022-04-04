import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

const routes: Routes = [
  {path:'',component:ProfileComponent,
  children:[
    {path:'',component:TodosListComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
