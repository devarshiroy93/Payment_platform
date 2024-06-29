import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  /**
   * service reference to httpClient 
   */
  private httpClient$: HttpClient = inject(HttpClient);

  /**
   * Behaviour subject to update balance on transaction completion
   */
  private notifyHome: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  getBalance(userId: number) {
    return this.httpClient$.get<any>(`${environment.paymentPlatformUrl}/balance?userId=${userId}`).pipe(
      map((res: any) => res.data)
    )
  }

  initBalanceForNewUser(userId: number): Observable<{ isSuccess: boolean, data: any }> {
    return this.httpClient$.post<any>(`${environment.paymentPlatformUrl}/balance`, { userId })
  }

  updateBalance() {
    this.notifyHome.next('updateBalance');
  }

  getNotifyHomeVal(): Observable<string> {
    return this.notifyHome.asObservable();
  }

}
