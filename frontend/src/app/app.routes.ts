import { Routes } from '@angular/router';
import { ProfileComponent } from './screens/profile/profile.component';
import { ErrorPageComponent } from './screens/error-page/error-page.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CharacterListingComponent } from './screens/character-listing/character-listing.component';
import { CharacterEditComponent } from './screens/character-edit/character-edit.component';
import { LoginComponent } from './screens/login/login.component';


// for testing
import { ClassListing } from './screens/class-listing/class-listing';
import { SignUpComponent } from './screens/sign-up/sign-up.component';


export const routes: Routes = [
  // for testing only
  {
    path:"test",
    component: ClassListing
  },


  // routes
  {
    path:"signup",
    component: SignUpComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"dashboard",
    component: DashboardComponent
  },
  {
    path:"error",
    component: ErrorPageComponent
  },
  {
    path:"profile",
    component: ProfileComponent,
  },

  {
    path:"characters",
    component: CharacterListingComponent
  },

  {
    path:"character/:row_id",
    component: CharacterEditComponent
  },

  // redirects 
  { path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  {
    path:"**",
    redirectTo: "/error",
    pathMatch: 'full'
  },
];
