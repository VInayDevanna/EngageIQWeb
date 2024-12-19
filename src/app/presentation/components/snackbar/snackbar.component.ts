import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  @Input() SnackBarMessage!: string;
  @Input() SnackBarType!: string;
  @Output() closeSnackBar = new EventEmitter();
  ngOnInit() {
    const snackbarComponent = document.getElementsByClassName('snackbar-component')[0];
    const snackbar = document.getElementById('snackbar');
    snackbarComponent?.classList.add('showSnackBar');
    snackbar?.classList.add('show');
    setTimeout(() => {
      if (snackbar?.classList.contains('show')) {
        snackbar?.classList.remove('show');
        snackbarComponent?.classList.remove('showSnackBar');
        this.closeSnackBar.emit();
      }
    }, 3000);
    if (this.SnackBarType === 'error') {
      snackbar?.classList.add('error-message');
    } else {
      snackbar?.classList.add('success-message');
    }
  }

  closeSnackbar = () => {
    const snackbarComponent = document.getElementsByClassName('snackbar-component')[0];
    const snackbar = document.getElementById('snackbar');
    snackbar?.classList.remove('show');
    snackbarComponent?.classList.remove('showSnackBar');
    this.closeSnackBar.emit();
  }

}


