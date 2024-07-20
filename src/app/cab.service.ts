import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cab } from './cabs.model';

@Injectable({
  providedIn: 'root'
})
export class CabService {
  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  registerCab(cab: Cab): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, cab);
  }

  getAllCabs(): Observable<Cab[]> {
    return this.http.get<Cab[]>(`${this.baseUrl}/getAllCabs`);
  }

  findDrivers(cabType: string): Observable<Cab[]> {
    return this.http.get<Cab[]>(`${this.baseUrl}/findDrivers/${cabType}`);
  }

  findDriverByName(driverName: string): Observable<Cab> {
    return this.http.get<Cab>(`${this.baseUrl}/findDriverByName/${driverName}`);
  }

  getCabById(id: number): Observable<Cab> {
    return this.http.get<Cab>(`${this.baseUrl}/getCab/${id}`);
  }

  updateCab(cab: Cab): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/update`, cab);
  }

  cancelRegistration(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/cancel/${id}`);
  }
}
