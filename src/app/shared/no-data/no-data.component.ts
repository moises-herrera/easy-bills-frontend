import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.css'],
})
export class NoDataComponent {

  @Input() imageSrc = 'assets/no-data.svg';
  @Input() message = 'No se encontraron registros.';
}
