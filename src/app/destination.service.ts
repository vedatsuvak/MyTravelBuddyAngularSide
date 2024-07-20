import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Destination } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private baseUrl = 'http://localhost:8087';

  constructor(private http: HttpClient) { }

  insertDestination(destination: Destination): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<void>(`${this.baseUrl}/insert`, destination, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDestination(destination: Destination): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<void>(`${this.baseUrl}/update`, destination, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.baseUrl}/getAllDestinations`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDestinationById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.baseUrl}/getOne/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPrice(source: string, destination: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getPrice/${source}/${destination}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSelectedDestination(source: string, destination: string): Observable<Destination> {
    return this.http.get<Destination>(`${this.baseUrl}/findDestination/${source}/${destination}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDestination(id: number): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
