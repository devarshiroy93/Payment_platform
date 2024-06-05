import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';
import { RouterModule } from '@angular/router';
import { SubNavComponent } from '../../components/sub-nav/sub-nav.component';

const IMPORTS = [RouterModule , SubNavComponent , AppBarComponent]
@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {

}
