import { Component } from '@angular/core';
import { LayoutsComponent } from "./presentation/layouts/layouts/layouts.component";
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ LayoutsComponent],
})
export class AppComponent {
  title = 'EngageIQ';
}
