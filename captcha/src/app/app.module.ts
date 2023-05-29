import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, RecaptchaV3Module, HttpClientModule],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LdLXE0mAAAAAFFFpljc6g1Yvf9CWs6cAxGM1J3B',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
