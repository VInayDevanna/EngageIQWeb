import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-prerequisites',
  standalone: true,
  imports: [ MatStepperModule, MatButtonModule, MatIconModule ],
  templateUrl: './prerequisites.component.html',
  styleUrl: './prerequisites.component.scss'
})
export class PrerequisitesComponent {
  gitInitialCommands=`
git init
git clone https://github.com/Ponniah96/angular-ikigai-frontend-app.git
npm install
npm install -g @angular/cli
ng serve
  `
}
