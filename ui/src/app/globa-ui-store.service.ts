import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileDetails } from './components/profile/profile.component';


export interface GlobalUiStore {
  user: ProfileDetails
  error?: {
    message: string
  }
}
const globalUiStore: GlobalUiStore = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
  }
}
@Injectable({
  providedIn: 'root'
})
export class GlobaUiStoreService {


  /**
   * Global UI store behaviour subject
   */
  private globaluiStore$: BehaviorSubject<GlobalUiStore> = new BehaviorSubject(globalUiStore);
  constructor() { }

  /**
   * getGlobalUi
   * @returns global ui as observable for components to subscribe
   */
  getGlobalUi() {
    return this.globaluiStore$.asObservable();
  }

  /**
   * updates the global Ui 
   * @param ui typeof GlobalUiStore
   */
  updateGlobalUi(ui: GlobalUiStore) {
    this.globaluiStore$.next(ui);
  }

}
