import { AbstractControl } from '@angular/forms';

export function setControlEnabledState(formControl: AbstractControl, state: boolean): void {
  if (state) {
    formControl.enable();
  } else {
    formControl.disable();
  }
}
