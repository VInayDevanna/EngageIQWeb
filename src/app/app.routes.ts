import { Routes } from '@angular/router';
import { HomepageComponent } from './presentation/pages/homepage/homepage.component';
import { IkigaiHomepageComponent } from './presentation/pages/ikigai/ikigai-homepage/ikigai-homepage.component';
import { IkigaiTeamsComponent } from './presentation/pages/ikigai/ikigai-teams/ikigai-teams.component';
import { PrerequisitesComponent } from './presentation/developerGuide/front-end/prerequisites/prerequisites.component';
import { StyleGuideComponent } from './presentation/developerGuide/front-end/style-guide/style-guide.component';
import { ArchitechtureGuideComponent } from './presentation/developerGuide/front-end/architechture-guide/architechture-guide.component';
import { LayoutModelsComponent } from './presentation/developerGuide/front-end/layout-models/layout-models.component';
import { WorkinProgreessComponent } from './presentation/errorPages/workin-progreess/workin-progreess.component';
import { PageNotFoundComponent } from './presentation/errorPages/page-not-found/page-not-found.component';
import { AIBasicsComponent } from './presentation/developerGuide/AI/aibasics/aibasics.component';
import { BackEndBasicsComponent } from './presentation/developerGuide/Backend/back-end-basics/back-end-basics.component';
import { MsalGuard } from '@azure/msal-angular';
import { TeammappingconfigComponent } from './presentation/pages/settings/teammapping/teammappingconfig/teammappingconfig.component';

export const routes: Routes = [
  {path:'login', component:HomepageComponent},
  {path:'OOCustomize', component:WorkinProgreessComponent, canActivate: [MsalGuard]},
  {path:'IGSchedule', component:WorkinProgreessComponent, canActivate: [MsalGuard]},
  {path:'IKIGAI', component:IkigaiHomepageComponent, canActivate: [MsalGuard]},
  { path: 'IKIGAI/:id/:teamname', component: IkigaiTeamsComponent, canActivate: [MsalGuard] },
  {path:'IKIGAI-Teams', component:IkigaiTeamsComponent, canActivate: [MsalGuard]},
  {path:'IGCustomize', component:WorkinProgreessComponent,  canActivate: [MsalGuard]},
  {path:'OOSchedule', component:WorkinProgreessComponent, canActivate: [MsalGuard]},
  {path:'OneToOne', component:WorkinProgreessComponent, canActivate: [MsalGuard]},
  {path:'Dashboard', component:HomepageComponent, canActivate: [MsalGuard]},
  {path:'layout-models', component:LayoutModelsComponent},
  {path:'prerequisites', component:PrerequisitesComponent},
  {path:'style-guide', component:StyleGuideComponent},
  {path:'architechture-guide', component:ArchitechtureGuideComponent},
  {path:'page-not-found', component:PageNotFoundComponent,canActivate: [MsalGuard]},
  {path:'AI-basics', component:WorkinProgreessComponent},
  {path:'back-end-basics', component:WorkinProgreessComponent},
  {path:'TeamMapping', component:TeammappingconfigComponent, canActivate: [MsalGuard]},
  // {path:'AI-basics', component:AIBasicsComponent},
  // {path:'back-end-basics', component:BackEndBasicsComponent},
  { path: '', component:HomepageComponent,canActivate: [MsalGuard]}, // Wildcard route for home redirect
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' } // Wildcard route for 404 redirect
];
