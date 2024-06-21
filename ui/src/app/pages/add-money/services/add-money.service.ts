import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { StartOnRampTxnRequest, StartOnRampTxnResponse } from '../add-money';

@Injectable({
  providedIn: 'root'
})
export class AddMoneyService {

  constructor() { }

  /**
   * Component reference to httpClient instance
   */
  private httpClient$: HttpClient = inject(HttpClient);

  /**
   * 
   * @param payload 
   * @returns Observable with transaction start response.
   */
  startAddMoneyTransaction(payload: StartOnRampTxnRequest): Observable<StartOnRampTxnResponse> {
    return this.httpClient$.post<StartOnRampTxnResponse>(`${environment.paymentPlatformUrl}/onRamp`, payload).pipe(map((res: StartOnRampTxnResponse) => {
      return {
        isSuccess: res.isSuccess,
        data: res?.data || {txnToken : ''},
        message: "Transaction started.Move over to transactions to check the status"
      }
    }), catchError(() => {
      return of({
        isSuccess: false,
        message: "Transaction failed.",
        data : null
      })
    }));

  }

}
