import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef } from '@core/common/utils/forms';
import { AuthRequest } from '../interfaces/auth.interface';
import { AuthConstants } from '@core/common/constants/auth/auth.constants';

export class AuthForm extends FormGroup<FormGroupDef<AuthRequest>> {
  constructor() {
    super({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });

    this.controls.email.addValidators([Validators.required, Validators.email]);
    this.controls.password.addValidators([
      Validators.required,
      Validators.minLength(AuthConstants.MIN_PASSWORD_LENGTH),
    ]);
  }
}
