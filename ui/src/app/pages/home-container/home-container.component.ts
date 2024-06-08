import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SubNavComponent } from '../../components/sub-nav/sub-nav.component';
import { RouterModule } from '@angular/router';

const IMPORTS = [CardComponent ,SubNavComponent , RouterModule];

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss'
})
export class HomeContainerComponent {

}
