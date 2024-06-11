import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { GetOnRampTransactionsResponse, OnRampTransaction } from '../transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  /**
   * Component reference to httpClient instance
   */
  private httpClient$: HttpClient = inject(HttpClient);


  getonRampTransactions(): Observable<OnRampTransaction[]> {
    return this.httpClient$.get<GetOnRampTransactionsResponse>(`${environment.paymentPlatformUrl}/transactions`).pipe(map(res => res.data))
  }
}
