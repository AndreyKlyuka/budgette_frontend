import { Injectable, Inject } from '@angular/core';
import { StorageProvider } from '../storage/interfaces';
import { InjectTokens } from '@core/config';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(InjectTokens.STORAGE_PROVIDER) private storageProvider: StorageProvider) {}

  getItem(key: string): string | null {
    return this.storageProvider.getItem(key);
  }
  setItem(key: string, value: string): void {
    this.storageProvider.setItem(key, value);
  }
  removeItem(key: string): void {
    this.storageProvider.removeItem(key);
  }
  clear(): void {
    this.storageProvider.clear();
  }
}
