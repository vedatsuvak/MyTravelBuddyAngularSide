import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hotels } from './hotels.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private baseUrl = 'http://ec2-18-234-99-129.compute-1.amazonaws.com:8090';

  constructor(private http: HttpClient) { }

  public insertHotel(hotel: Hotels): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<string>(`${this.baseUrl}/insert`, hotel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateHotel(hotel: Hotels): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<string>(`${this.baseUrl}/update`, hotel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAllHotels(): Observable<Hotels[]> {
    return this.http.get<Hotels[]>(`${this.baseUrl}/getAllHotels`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getHotelById(id: number): Observable<Hotels> {
    return this.http.get<Hotels>(`${this.baseUrl}/getOne/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getPriceByHotelName(hotelName: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getPrice/${hotelName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public findHotelByName(hotelName: string): Observable<Hotels> {
    return this.http.get<Hotels>(`${this.baseUrl}/findHotel/${hotelName}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getHotelsByLocation(location: string, checkInDate: string, checkOutDate: string): Observable<Hotels[]> {
    return this.http.get<Hotels[]>(`${this.baseUrl}/getHotelsByLocation/${location}/${checkInDate}/${checkOutDate}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteHotelById(id: number): Observable<string> {
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
