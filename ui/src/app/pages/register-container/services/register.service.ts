import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterApiFormattedUiResponse, RegisterApiRequest, RegisterApiResponse } from '../register-container';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  /**
   * HttpClient observable for making API calls
   */
  private httpClient$: HttpClient = inject(HttpClient);


  /**
     * Calls the register APi with payload
    */
  register(payload: RegisterApiRequest): Observable<RegisterApiFormattedUiResponse> {

    return this.httpClient$.post<RegisterApiFormattedUiResponse>(`${environment.platformAuthUrl}/api/v1/user/register`, payload)
      .pipe((map((data: RegisterApiResponse) => {
        return { isSuccess: true, message: data.body?.message }
      }), catchError(() => {
        return of({ isSuccess: false, message: 'Failed' })
      })))

  }
}
