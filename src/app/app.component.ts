import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MessagesModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
