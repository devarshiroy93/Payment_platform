import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetContactListResponse, SendMoneyRequest, SendMoneyResponse } from '../send-money';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendMoneyService {

  private http$: HttpClient = inject(HttpClient);
  constructor() { }

  getContactList() {

    return this.http$.get<GetContactListResponse>(`${environment.platformAuthUrl}/api/v1/user/users`)
      .pipe(map(res => res.body));
  }

  sendMoney(payload: SendMoneyRequest) {
    return this.http$.post<SendMoneyResponse>(`${environment.paymentPlatformUrl}/p2pTransaction`, payload)
      .pipe(catchError((res : SendMoneyResponse) => {
        return of({isSuccess : false , data : null , message : 'Transaction failed' })
      }))

  }
}
