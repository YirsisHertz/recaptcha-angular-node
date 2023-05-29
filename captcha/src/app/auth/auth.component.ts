import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  public authForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(3)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  public async login() {
    if (this.authForm.invalid) {
      Swal.fire('error', 'Email o Password Invalido', 'error');

      return;
    }

    try {
      const res: any = await this.authService.login(this.authForm.value);

      Swal.fire('Ok', res.msg, 'success');
    } catch ({ error }: any) {
      Swal.fire('Error', error.msg, 'error');
    }
  }
}
