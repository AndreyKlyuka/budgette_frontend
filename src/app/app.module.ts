import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InjectTokens } from '@core/config';
import { LocaleStorageService } from '@core/services/storage/strategies';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [{ provide: InjectTokens.STORAGE_PROVIDER, useClass: LocaleStorageService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
