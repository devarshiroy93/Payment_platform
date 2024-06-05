import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SigininFormattedUiResponse, SignInApiResponse, SigninRequest } from '../login-container';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Component reference to httpClient instance
   */
  private httpClient$: HttpClient = inject(HttpClient);
  constructor() { }

  login(payload: SigninRequest): Observable<SigininFormattedUiResponse> {

    return this.httpClient$.post<SignInApiResponse>(`${environment.platformAuthUrl}/api/v1/user/signin`, payload)
      .pipe(map((res: SignInApiResponse) => {
        return {
          isSuccess: res.isSuccess,
          token: res.body.token
        }
      }), catchError(() => {
        return of({ isSuccess: false, token : null })
      }))

  }



}
