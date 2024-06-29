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
      .pipe(map((res : RegisterApiResponse)=>{
        return {id : res.body?.id || 0  ,isSuccess : true , message : res.body?.message || 'Registration successful'}
      }),catchError(res=>{
        return of({id : 0 , isSuccess: false , message : 'User registration failed'})
      }))

  }
}
