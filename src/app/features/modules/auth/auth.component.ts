import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@core/config/environment/environment';
import { markControlAsTouchedAndValidate } from '@core/common/utils/forms';
import { AuthLoginForm } from '@modules/auth/forms/auth-login.form';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { StorageService } from '@core/services/storage';
import { InjectTokens } from '@core/config';
import { LocaleStorageService } from '@core/services/storage/strategies';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{ provide: InjectTokens.STORAGE_PROVIDER, useClass: LocaleStorageService }],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public readonly authLoginForm = new AuthLoginForm();

  constructor(
    private readonly http: HttpClient,
    @Inject(InjectTokens.STORAGE_PROVIDER) private readonly storageService: StorageService,
  ) {}

  public isRegister: boolean = false;

  public loginSubmit() {
    if (this.authLoginForm.valid) {
      this.http
        .post<{ accessToken: string }>(environment.apiUrl + 'auth/login', {
          ...this.authLoginForm.value,
        })
        .pipe(
          tap((result) => {
            this.storageService.setItem('token', result.accessToken);
          }),
        )
        .subscribe();
    } else {
      markControlAsTouchedAndValidate(this.authLoginForm);
    }
  }

  public registerSubmit() {}

  ngOnInit(): void {}
}
