import { Routes } from '@angular/router';
import { ProfileComponent } from './screens/profile/profile.component';
import { ErrorPageComponent } from './screens/error-page/error-page.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CharacterListingComponent } from './screens/character-listing/character-listing.component';
import { CharacterEditComponent } from './screens/character-edit/character-edit.component';
import { LoginComponent } from './screens/login/login.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { CharacterAddComponent } from './screens/character-add/character-add.component';
import { AuthGuard } from './services/auth-guard';
import { LoginGuard } from './services/login-guard';
import { CharacterLevelComponent } from './screens/character-level/character-level.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';


export const routes: Routes = [

  // routes
  {
    path: "signup",
    loadComponent: () => import('./screens/sign-up/sign-up.component').then((m) => m.SignUpComponent),
    canActivate: [LoginGuard]
  },
  {
    path: "login",
    loadComponent: () => import('./screens/login/login.component').then((m) => m.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path:"dashboard",
    loadComponent: () => import('./screens/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path:"error",
    loadComponent: () => import('./screens/error-page/error-page.component').then((m) => m.ErrorPageComponent)
  },
  {
    path:"reset-password",
    loadComponent: () => import('./screens/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent)
  },
  {
    path: "forgot-password",
    loadComponent: () => import('./screens/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent)
  },
  {
    path:"profile",
    loadComponent: () => import('./screens/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [AuthGuard]
  },

  {
    path:"characters",
    loadComponent: () => import('./screens/character-listing/character-listing.component').then((m) => m.CharacterListingComponent),
    canActivate: [AuthGuard]
  },

  {
    path:"character/new",
    loadComponent: () => import('./screens/character-add/character-add.component').then((m) => m.CharacterAddComponent),
    canActivate: [AuthGuard]
  },

  {
    path:"character/:row_id",
    loadComponent: () => import('./screens/character-edit/character-edit.component').then((m) => m.CharacterEditComponent),
    canActivate: [AuthGuard]
  },

  {
    path:"character/:row_id/level/:level",
    loadComponent: () => import('./screens/character-level/character-level.component').then((m) => m.CharacterLevelComponent),
    canActivate: [AuthGuard]
  },

  // redirects 
  { path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path:"**",
    redirectTo: "/error",
    pathMatch: 'full'
  },
];
