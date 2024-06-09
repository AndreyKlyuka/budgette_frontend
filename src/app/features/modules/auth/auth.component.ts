import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectTokens } from '@core/config';
import { LocaleStorageService } from '@core/services/storage/strategies';
import { AuthForm } from '@modules/auth/form/auth.form';
import { markControlAsTouchedAndValidate } from '@core/common/utils/forms';
import { AuthService } from '@modules/auth/auth.service';
import { AuthRequest } from '@modules/auth/interfaces/auth.interface';
import { handleResponseErrorWithToastr } from '@core/common/utils/errors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService, { provide: InjectTokens.STORAGE_PROVIDER, useClass: LocaleStorageService }],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  @Input() public isRegistration: boolean = false;

  public readonly authForm = new AuthForm();

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
  ) {}

  public submit(isRegistration: boolean) {
    if (this.authForm.valid) {
      const preparedFormData = this.authForm.getRawValue();
      if (isRegistration) {
        this.register(preparedFormData);
      } else {
        this.login(preparedFormData);
      }
    } else {
      markControlAsTouchedAndValidate(this.authForm);
    }
  }

  private register(data: AuthRequest): void {
    this.authService.register(data).subscribe({
      error: (error) => handleResponseErrorWithToastr(error, this.toastrService),
    });
  }

  private login(data: AuthRequest): void {
    this.authService.login(data).subscribe({
      error: (error) => handleResponseErrorWithToastr(error, this.toastrService),
    });
  }
}
