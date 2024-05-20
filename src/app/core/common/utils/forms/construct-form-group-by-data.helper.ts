import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormGroupDef } from './form-group-def.type';

export function constructFormGroupByData<T extends object>(data: T): FormGroupDef<T> {
  const result: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    result[key] = determineControlBasedOnData(value);
  });

  return result as FormGroupDef<T>;
}

function determineControlBasedOnData(data: unknown): AbstractControl {
  if (Array.isArray(data)) {
    return new FormArray(data.map((item) => determineControlBasedOnData(item)));
  } else if (typeof data === 'object' && data !== null) {
    return new FormGroup(constructFormGroupByData(data));
  }

  return new FormControl(data);
}
