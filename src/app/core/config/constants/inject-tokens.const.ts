import { InjectionToken } from '@angular/core';
import { StorageService } from '@core/services/storage';

export const InjectTokens = {
  STORAGE_PROVIDER: new InjectionToken<StorageService>('StorageProvider'),
} as const;
