import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationServiceService {
  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }
  public doregistration(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<any>(`${this.baseUrl}/register`, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public login(user: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/login/${user.username}/${user.password}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getuser(id: number){
    return this.http.get<any>(`${this.baseUrl}/getUser/${id}`)
  }
  public deleteuser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteById/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  public updateUser(users: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/updateUser`, users, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  public getuserbyemail(email: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(`${this.baseUrl}/findbyemail/${email}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public getusers() {
    return this.http.get<any>(`${this.baseUrl}/getAllusers`)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
