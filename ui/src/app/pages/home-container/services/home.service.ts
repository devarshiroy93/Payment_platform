import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  /**
   * service reference to httpClient 
   */
  private httpClient$: HttpClient = inject(HttpClient);

  constructor() { }

  getBalance() {
    return this.httpClient$.get<any>(`${environment.paymentPlatformUrl}/balance?userId=33`).pipe(
      map((res: any) => res.data)
    )
  }
}
