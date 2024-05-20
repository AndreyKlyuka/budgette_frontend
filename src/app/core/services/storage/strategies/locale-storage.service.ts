import { Injectable } from '@angular/core';
import { StorageProvider } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocaleStorageService implements StorageProvider {
  constructor() {}

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
