import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';
import { LoginGuard } from './services/login-guard';
import { HomebrewGuard } from './services/homebrew-guard';

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


  {
    path: "homebrew",
    loadComponent: () => import('./screens/homebrew-dashboard/homebrew-dashboard.component').then((m) => m.HomebrewDashboardComponent),
    canActivate: [HomebrewGuard],
    children: [
      {
        path: "classes",
        loadComponent: () => import('./screens/homebrew-class-listing/homebrew-class-listing.component').then((m) => m.HomebrewClassListingComponent),
        canActivate: [HomebrewGuard]
      },
      {
        path: "subclasses",
        loadComponent: () => import('./screens/homebrew-subclass-listing/homebrew-subclass-listing.component').then((m) => m.HomebrewSubclassListingComponent),
        canActivate: [HomebrewGuard]
      },
      {
        path: "species",
        loadComponent: () => import('./screens/homebrew-species-listing/homebrew-species-listing.component').then((m) => m.HomebrewSpeciesListingComponent),
        canActivate: [HomebrewGuard]
      },
      {
        path: "subspecies",
        loadComponent: () => import('./screens/homebrew-subspecies-listing/homebrew-subspecies-listing.component').then((m) => m.HomebrewSubspeciesListingComponent),
        canActivate: [HomebrewGuard]
      },
    ]
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
