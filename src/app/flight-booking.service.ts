import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightBookingsModel } from './flight-bookings.model';

@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {
  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient) { }

  bookFlight(flightBooking: FlightBookingsModel): Observable<FlightBookingsModel> {
    return this.http.post<FlightBookingsModel>(`${this.baseUrl}/create`, flightBooking);
  }

  getAllFlightBookings(): Observable<FlightBookingsModel[]> {
    return this.http.get<FlightBookingsModel[]>(`${this.baseUrl}/getAll`);
  }

  getFlightBookingById(id: number): Observable<FlightBookingsModel> {
    return this.http.get<FlightBookingsModel>(`${this.baseUrl}/getById/${id}`);
  }

  getFlightsByUserId(userId: number): Observable<FlightBookingsModel[]> {
    return this.http.get<FlightBookingsModel[]>(`${this.baseUrl}/userBooking/${userId}`);
  }

  updateFlightBooking(flightBooking: FlightBookingsModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update`, flightBooking);
  }

  deleteFlightBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
