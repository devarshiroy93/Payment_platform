import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { CardComponent } from '../../components/card/card.component';
import { SubNavComponent } from '../../components/sub-nav/sub-nav.component';
import { HomeUiService } from './services/home-ui.service';
import { CommonModule } from '@angular/common';
import { AlertSettings } from '../../components/alert/alert';
import { Observable, delay, map, of, share } from 'rxjs';
import { HomeService } from './services/home.service';

const IMPORTS = [CardComponent, SubNavComponent, RouterModule, AlertComponent, CommonModule];

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss'
})
export class HomeContainerComponent implements OnInit {


  /**
   * component reference to ui service for home page
   */
  private homeUiService: HomeUiService = inject(HomeUiService);

  /**
   * component reference to ui service for home page
   */
  private homeService: HomeService = inject(HomeService);

  /**
   *Component reference to observable ultimately resolving to alertSettings 
   */
  alertSettings$: Observable<AlertSettings> = this.homeUiService.getHomeUiAlertDetails();

  /**
  *Component reference to observable 
  ultimately resolving to number denoting user waller balance
  */
  balance$: Observable<any> = of({value : 0 , pending : true});


  ngOnInit(): void {
   
    this.balance$.subscribe((data)=>{
      console.log(data);
    })
    this.balance$ = this.homeService.getBalance().pipe(delay(1000),map(res => {
      return {
        value : res.amount,
        pending : false,
      }
    }));
    
  }
}
