import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly recaptchaV3Service: ReCaptchaV3Service
  ) {}

  private generateCaptcha() {
    return this.recaptchaV3Service.execute('importantAction');
  }

  public async login(data: any) {
    const token = await firstValueFrom(this.generateCaptcha());

    return firstValueFrom(
      this.httpClient.post(`http://localhost:3000/auth/login`, {
        ...data,
        token,
      })
    );
  }
}
