import { Routes } from '@angular/router';
import { HomepageComponent } from './presentation/pages/homepage/homepage.component';
import { LayoutModelsComponent } from './presentation/developerGuide/front-end/layout-models/layout-models.component';
import { PageNotFoundComponent } from './presentation/errorPages/page-not-found/page-not-found.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './presentation/pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'OOCustomize',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  {
    path: 'IGSchedule',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  { 
    path: 'IKIGAI', 
    loadComponent: () => import('./presentation/pages/ikigai/ikigai-homepage/ikigai-homepage.component').then(mod=> mod.IkigaiHomepageComponent), 
    canActivate: [MsalGuard]
  },
  { 
    path: 'IKIGAI/:id/:teamname', 
    loadComponent: () => import('./presentation/pages/ikigai/ikigai-teams/ikigai-teams.component').then(mod=> mod.IkigaiTeamsComponent), 
    canActivate: [MsalGuard] 
  },
  { 
    path: 'IKIGAI-Teams', 
    loadComponent: () => import('./presentation/pages/ikigai/ikigai-teams/ikigai-teams.component').then(mod=> mod.IkigaiTeamsComponent), 
    canActivate: [MsalGuard] 
  },
  {
    path: 'IGCustomize',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  {
    path: 'OOSchedule',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  {
    path: 'OneToOne',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  { path: 'Dashboard', component: HomepageComponent, canActivate: [MsalGuard] },
  { path: 'layout-models', component: LayoutModelsComponent },
  { 
    path: 'prerequisites', 
    loadComponent: () => import('./presentation/developerGuide/front-end/prerequisites/prerequisites.component').then(mod=>mod.PrerequisitesComponent)
  },
  { 
    path: 'style-guide', 
    loadComponent: () => import('./presentation/developerGuide/front-end/style-guide/style-guide.component').then(mod=>mod.StyleGuideComponent)
  },
  { 
    path: 'architechture-guide', 
    loadComponent: ()=> import('./presentation/developerGuide/front-end/architechture-guide/architechture-guide.component').then(mod=> mod.ArchitechtureGuideComponent)
  },
  { path: 'page-not-found', component: PageNotFoundComponent, canActivate: [MsalGuard] },
  {
    path: 'AI-basics',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  {
    path: 'back-end-basics',
    loadComponent: () => import('./presentation/errorPages/workin-progreess/workin-progreess.component').then(mod => mod.WorkinProgreessComponent),
    canActivate: [MsalGuard]
  },
  { 
    path: 'TeamMapping', 
    loadComponent:()=> import('./presentation/pages/settings/teammapping/teammappingconfig/teammappingconfig.component').then(mod=> mod.TeammappingconfigComponent), 
    canActivate: [MsalGuard] 
  },
  // {path:'AI-basics', component:AIBasicsComponent},
  // {path:'back-end-basics', component:BackEndBasicsComponent},
  { path: '', component: HomepageComponent, canActivate: [MsalGuard] }, // Wildcard route for home redirect
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' } // Wildcard route for 404 redirect
];
