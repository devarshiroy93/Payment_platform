import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `<div>
    <span class="loader"></span>
  </div>`,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

}
