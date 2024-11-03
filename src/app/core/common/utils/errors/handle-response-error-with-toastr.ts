import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export function handleResponseErrorWithToastr(toastService: ToastrService, { error }: HttpErrorResponse): void {
  if (Array.isArray(error.message)) {
    const errs = error.message;
    for (let err of errs) {
      toastService.error(err);
    }
  } else {
    toastService.error(error.message);
  }
}
