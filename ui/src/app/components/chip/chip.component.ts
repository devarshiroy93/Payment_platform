import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {

  /***
   * Component input variable to determine chip type
   */
  @Input()
  type: 'error' | 'success' | 'pending'= 'pending';

}
