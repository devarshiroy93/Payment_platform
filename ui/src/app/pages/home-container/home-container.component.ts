import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, delay, map, of, switchMap } from 'rxjs';
import { AlertSettings } from '../../components/alert/alert';
import { AlertComponent } from '../../components/alert/alert.component';
import { CardComponent } from '../../components/card/card.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { SubNavComponent } from '../../components/sub-nav/sub-nav.component';
import { GlobaUiStoreService } from '../../globa-ui-store.service';
import { HomeUiService } from './services/home-ui.service';
import { HomeService } from './services/home.service';

const IMPORTS = [CardComponent, SubNavComponent, RouterModule, AlertComponent, CommonModule, ProfileComponent];

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss'
})
export class HomeContainerComponent implements OnInit, OnDestroy {


  /**
   * component reference to ui service for home page
   */
  private homeUiService: HomeUiService = inject(HomeUiService);

  /**
   * component reference to global ui store service
   */
  private globalUiStoreService$: GlobaUiStoreService = inject(GlobaUiStoreService);

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
  balance$: Observable<any> = of({ value: 0, pending: true });

  /**
   * Component ref to update balance subscription
   */
  updateBalanceSubscription: Subscription | null = null;


  ngOnInit(): void {
    this.listenForBalanceUpdate();
    this.getBalance();

  }

  getBalance() {
    this.balance$ = this.globalUiStoreService$.getGlobalUi().pipe(switchMap((response) => {
      return this.homeService.getBalance(response.user.id).pipe(delay(1000), map(res => {
        return {
          value: res.amount,
          pending: false,
        }
      }));
    }))
  }

  listenForBalanceUpdate() {
    this.updateBalanceSubscription = this.homeService.getNotifyHomeVal().subscribe(val => {
      if (val === 'updateBalance') {
        this.getBalance();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.updateBalanceSubscription) {
      this.updateBalanceSubscription.unsubscribe();
    }
  }
}
