import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HotelBookings} from "./HotelBookings.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {FlightBookingsModel} from "./flight-bookings.model";

@Injectable({
  providedIn: 'root'
})
export class HotelBookingsService {
  private baseUrl = 'http://ec2-3-93-248-34.compute-1.amazonaws.com:8092';

  constructor(private http: HttpClient) { }

  public bookHotel(bookingDetails: HotelBookings): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<string>(`${this.baseUrl}/bookHotel`, bookingDetails, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateHotelBooking(bookingDetails: HotelBookings): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<string>(`${this.baseUrl}/update`, bookingDetails, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAllHotelBookings(): Observable<HotelBookings[]> {
    return this.http.get<HotelBookings[]>(`${this.baseUrl}/getAll`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getHotelBookingById(id: number): Observable<HotelBookings> {
    return this.http.get<HotelBookings>(`${this.baseUrl}/getById/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHotelByUserId(userId: number): Observable<HotelBookings[]> {
    return this.http.get<HotelBookings[]>(`${this.baseUrl}/userBooking/${userId}`);
  }
  public deleteHotelBookingById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
