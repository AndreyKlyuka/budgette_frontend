import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthComponent } from '@modules/auth/auth.component';
import { WrapperComponent } from '../../layouts/wrapper/wrapper.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, WrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
