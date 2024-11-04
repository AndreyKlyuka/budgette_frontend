import { Inject, Injectable } from '@angular/core';
import { InjectTokens } from '@core/config';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponce } from '@modules/auth/interfaces/auth.interface';
import { StorageService } from '@core/services/storage';
import { HttpService } from '@core/services/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable();

  constructor(
    private readonly httpService: HttpService,
    @Inject(InjectTokens.STORAGE_PROVIDER)
    private readonly storageService: StorageService,
  ) {
    this.authSubject.next(Boolean(this.storageService.getItem('token')));
  }

  public register(requestData: AuthRequest): Observable<unknown> {
    return this.httpService.post('auth/register', requestData);
  }

  public login(requestData: AuthRequest): Observable<AuthResponce> {
    return this.httpService.post<AuthResponce>('auth/login', requestData, { withCredentials: true }).pipe(
      tap((result) => {
        this.storageService.setItem('token', result.accessToken);
        this.authSubject.next(true);
      }),
    );
  }

  public logout(): Observable<unknown> {
    return this.httpService.post('auth/logout', {}, { withCredentials: true }).pipe(
      tap((result) => {
        this.storageService.removeItem('token');
        this.authSubject.next(false);
      }),
    );
  }
}
