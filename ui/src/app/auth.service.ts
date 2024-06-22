import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';

export type AuthRes = {
  isSuccess: boolean,
  body: {
    user: {
      id: number,
      firstName: string,
      lastName: string,
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * component instance of Http client 
   */
  private httpClient$: HttpClient = inject(HttpClient);


  constructor() { }


  /**
  * service function to check if user is authenticated
  */
  userDetails(): Observable<{ id: number, firstName: string, lastName: string }> {
    return this.httpClient$.get<AuthRes>(`${environment.platformAuthUrl}/api/v1/user/details`)
      .pipe(map((res) => {
        return {
          id: res.body.user.id,
          firstName: res.body.user.firstName,
          lastName: res.body.user.lastName
        }
      }), catchError((err) => {
        return of({ id: 0, firstName: '', lastName: '' })
      }))
  }
}
