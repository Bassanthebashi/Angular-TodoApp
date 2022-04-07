import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthLoginRegGuardService } from './services/auth-login-reg-guard.service';

const routes: Routes = [
  { path: 'signin', component: LoginPageComponent,canActivate:[AuthLoginRegGuardService] },
  { path: 'signup', component: RegisterPageComponent,canActivate:[AuthLoginRegGuardService] },
  {
    path: '', component: ProfileComponent,
    children: [
      { path: '', component: TodosListComponent }
    ], canActivate:[AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
