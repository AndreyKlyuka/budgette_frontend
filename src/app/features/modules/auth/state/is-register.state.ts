import { BaseState } from '@core/state';

export class IsRegistrationState extends BaseState<boolean> {
  public override readonly _data$: any;
  public override get data$() {
    return this._data$;
  }
  public override set data$(data$: any) {
    this._data$.next(data$);
  }
}
