

// for testing
import { ClassListing } from './screens/class-listing/class-listing';






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
  // for testing only
  {
    path:"test",
    component: ClassListing
  },


  // routes
  {
    path:"signup",
    component: SignUpComponent,
    canActivate: [LoginGuard]
  },
  {
    path:"login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"error",
    component: ErrorPageComponent
  },
  {
    path:"reset-password",
    component: ResetPasswordComponent
  },
  {
    path:"forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path:"profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"characters",
    component: CharacterListingComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"character/new",
    component: CharacterAddComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"character/:row_id",
    component: CharacterEditComponent,
    canActivate: [AuthGuard]
  },

  {
    path:"character/:row_id/level/:level",
    component: CharacterLevelComponent,
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
