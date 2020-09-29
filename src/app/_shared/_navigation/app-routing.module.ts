import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from 'src/app/modules/games/games.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { AuthGuard } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegistrationComponent },
  { path: 'Games', component: GamesComponent, canActivate: [AuthGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
