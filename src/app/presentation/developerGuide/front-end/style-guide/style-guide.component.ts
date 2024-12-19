import { M } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss'
})
export class StyleGuideComponent {

}
