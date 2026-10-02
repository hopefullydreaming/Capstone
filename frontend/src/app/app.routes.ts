import { Routes } from '@angular/router';
import { ProfileComponent } from './screens/profile/profile.component';
import { ErrorPageComponent } from './screens/error-page/error-page.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CharacterListingComponent } from './screens/character-listing/character-listing.component';
import { CharacterEditComponent } from './screens/character-edit/character-edit.component';


// for testing
import { ClassListing } from './screens/class-listing/class-listing';


export const routes: Routes = [
  // for testing only
  {
    path:"test",
    component: ClassListing
  },


  // routes
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
