import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly STORAGE_KEY = 'user_session';

  setSession(user: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    window.location.reload();
  }

  getSession(): any {
    const sessionData = localStorage.getItem(this.STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  }

  setAdditionalData(key: string, value: any): void {
    const session = this.getSession() || {};
    session[key] = value;
    this.setSession(session);
  }

  getAdditionalData(key: string): any {
    const session = this.getSession();
    return session ? session[key] : null;
  }
}
