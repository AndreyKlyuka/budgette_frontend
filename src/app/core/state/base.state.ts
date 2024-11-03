import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseState<T> {
  public get data$(): Observable<T | null> {
    return this._data$.asObservable();
  }

  public get data(): T | null {
    return this._data$.value;
  }

  protected readonly _data$: BehaviorSubject<T | null>;

  constructor(private initialData: T | null = null) {
    this._data$ = new BehaviorSubject<T | null>(this.initialData);
  }

  public set(value: T): void {
    this.setNewValue(value);
  }

  public clear(): void {
    this.setNewValue(null);
  }

  protected setNewValue(value: T | null): void {
    this._data$.next(value);
  }

  protected tryDoAction<V>(actionName: string, actionFunc: () => any): V | undefined {
    try {
      return actionFunc();
    } catch (e: any) {
      this.catchError(e, actionName);

      return undefined;
    }
  }

  protected catchError(e: Error, actionName: string): void {
    if (e instanceof TypeError) {
      throw new Error(`Can not ${actionName}. Firstly set array.`);
    }

    throw new Error(`Error: '${e.message}' in action '${actionName}'`);
  }
}
