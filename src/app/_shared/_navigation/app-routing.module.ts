import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { AuthGuard } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegistrationComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
