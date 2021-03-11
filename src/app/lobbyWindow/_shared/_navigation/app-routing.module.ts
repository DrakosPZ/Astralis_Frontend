import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenComponent } from 'src/app/gameWindow/_screen/screen.component';
import { GamesComponent } from 'src/app/lobbyWindow/modules/games/games.component';
import { HomeComponent } from 'src/app/lobbyWindow/modules/home/home.component';
import { LoginComponent } from 'src/app/lobbyWindow/modules/login/login.component';
import { RegistrationComponent } from 'src/app/lobbyWindow/modules/registration/registration.component';
import { AuthGuard } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegistrationComponent },
  { path: 'Games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'Game/:id', component: ScreenComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
