import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent {
  /** User email. */
  userEmail!: string;

  constructor(private location: Location) {
    this.userEmail = (this.location.getState() as any)?.email as string;
  }
}
