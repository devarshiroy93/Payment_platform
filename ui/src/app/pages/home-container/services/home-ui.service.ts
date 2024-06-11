import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { AlertSettings } from '../../../components/alert/alert';

@Injectable({
  providedIn: 'root'
})
export class HomeUiService {

  private ui$: Observable<{
    alertDetails: AlertSettings
  } | null> = of(null);

  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() { }

  updateHomeUiAlert(data: AlertSettings) {
    this.subject.next(data);
  }

  getHomeUiAlertDetails(): Observable<AlertSettings> {
    this.ui$ = this.subject.asObservable().pipe(map((data: any) => {
      return {
        alertDetails: data
      }
    }));
    return this.ui$.pipe(map(data => data?.alertDetails || {
      show: false,
      type: 'error',
      message: ''
    }));
  }




}
