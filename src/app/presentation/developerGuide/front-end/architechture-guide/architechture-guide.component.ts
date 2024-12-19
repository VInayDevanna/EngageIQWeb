import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-architechture-guide',
  standalone: true,
  imports: [ MatStepperModule, MatButtonModule, MatIconModule ],
  templateUrl: './architechture-guide.component.html',
  styleUrl: './architechture-guide.component.scss'
})
export class ArchitechtureGuideComponent {

}
