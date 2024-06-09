import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, InjectTokens } from '@core/config';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponce } from '@modules/auth/interfaces/auth.interface';
import { StorageService } from '@core/services/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(InjectTokens.STORAGE_PROVIDER) private readonly storageService: StorageService,
  ) {}

  public register(requestData: AuthRequest): Observable<unknown> {
    return this.http.post(environment.apiUrl + 'auth/register', {
      ...requestData,
    });
  }

  public login(requestData: AuthRequest): Observable<AuthResponce> {
    return this.http
      .post<AuthResponce>(environment.apiUrl + 'auth/login', {
        ...requestData,
      })
      .pipe(
        tap((result) => {
          this.storageService.setItem('token', result.accessToken);
        }),
      );
  }
}
