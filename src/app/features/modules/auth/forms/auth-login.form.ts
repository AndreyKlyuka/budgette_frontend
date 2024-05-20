import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupDef } from '@core/common/utils/forms';
import { Auth } from '../interfaces/auth.interface';

export class AuthLoginForm extends FormGroup<FormGroupDef<Auth>> {
  constructor() {
    super({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
    this.controls.email.addValidators([Validators.required]);
    this.controls.password.addValidators([Validators.required, Validators.min(7)]);
  }
}
