import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-sub-nav',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './sub-nav.component.html',
  styleUrl: './sub-nav.component.scss'
})
export class SubNavComponent {

}
