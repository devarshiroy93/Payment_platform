import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { GlobaUiStoreService } from '../../globa-ui-store.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

export interface ProfileDetails {

  id: number,
  firstName: string,
  lastName: string,

}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  /**
   * component reference to global ui store service
   */
  globalUiStore: GlobaUiStoreService = inject(GlobaUiStoreService);

  /**
   * Observable stream ultimately resolving to profile details
   */
  profileDetails$: Observable<ProfileDetails | null> = of(null);

  ngOnInit(): void {
    this.profileDetails$ = this.globalUiStore.getGlobalUi().pipe(map(data => data.user));
  }
}
