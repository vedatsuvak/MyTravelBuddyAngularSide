import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flights } from './flights.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'http://ec2-44-204-181-71.compute-1.amazonaws.com:8089';

  constructor(private http: HttpClient) { }

  insertFlight(flight: Flights): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<string>(`${this.baseUrl}/insert`, flight, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateFlight(flight: Flights): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<string>(`${this.baseUrl}/update`, flight, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllFlights(): Observable<Flights[]> {
    return this.http.get<Flights[]>(`${this.baseUrl}/getAllFlights`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFlightById(id: number): Observable<Flights> {
    return this.http.get<Flights>(`${this.baseUrl}/getOne/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  searchFlights(departureCity: string, arrivalCity: string, date: string, passengers: number): Observable<Flights[]> {
    let params = new HttpParams()
      .set('departureCity', departureCity)
      .set('arrivalCity', arrivalCity)
      .set('date', date)
      .set('passengers', passengers.toString());

    return this.http.get<Flights[]>(`${this.baseUrl}/searchFlights`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteFlight(id: number): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`, httpOptions)
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
