import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  providers: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public readonly authForm = new AuthForm();

  constructor(private readonly authService: AuthService, private readonly toastrService: ToastrService) {}

  public submit() {
    if (this.authForm.invalid) {
      markControlAsTouchedAndValidate(this.authForm);
    } else {
      this.login(this.authForm.getRawValue());
    }
  }

  private login(data: AuthRequest): void {
    this.authService.login(data).subscribe({
      next: (next) => {
        this.toastrService.success('Successfully logged in');
      },
      error: (error) => handleResponseErrorWithToastr(this.toastrService, error),
    });
  }

  public logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.toastrService.success('Successfully logged out');
      },
    });
  }
}
