import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookCabServiceService {
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) { }

  bookCab(bookingData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.baseUrl}/bookCab`, bookingData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  myBookings(userId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(`${this.baseUrl}/getUserBookings/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteBooking/${bookingId}`, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBookingById(bookingId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<any>(`${this.baseUrl}/getBookingById/${bookingId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBooking(bookingId: number, bookingDate: string, bookingTime: string, paymentType: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateBooking/${bookingId}/${bookingDate}/${bookingTime}/${paymentType}`, null, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
