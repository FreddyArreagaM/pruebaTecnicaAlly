import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submitted = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _toastrService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this._authService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
            this._toastrService.success(
              'Bienvenido, Ingreso exitoso',
              'Sistema',
              {
                progressBar: true,
                timeOut: 2000,
                progressAnimation: 'decreasing',
              }
            );
          },
          error: (error: HttpErrorResponse) => {
            console.log('Error en login:', error);
            if (error.error && error.error.message) {
              this._toastrService.error(
                error.error.message,
                'Error de Sistema!',
                {
                  progressBar: true,
                  timeOut: 2000,
                  progressAnimation: 'decreasing',
                }
              );
            } else {
              this._toastrService.error(
                'Ocurrió un error inesperado.',
                'Error de Sistema!',
                {
                  progressBar: true,
                  timeOut: 2000,
                  progressAnimation: 'decreasing',
                }
              );
            }
          },
        });
    } else {
      this._toastrService.error(
        'Formulario Inválido.',
        'Accesos Inválidos!',
        {
          progressBar: true,
          timeOut: 2000,
          progressAnimation: 'decreasing',
        }
      );
    }
  }
}
