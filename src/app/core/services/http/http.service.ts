import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public post<T>(url: string, body?: any, options?: {}): Observable<T> {
    return this.http.request<T>('post', environment.apiUrl + url, { body, ...options });
  }
}
