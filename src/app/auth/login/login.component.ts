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

    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    console.log('🚀 ~ LoginComponent ~ onLogin ~ credentials:', credentials);

    // Call the login method from AuthService
    this._authService.login(credentials.email, credentials.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this._toastrService.success('Bienvenido, Ingreso exitoso', 'Sistema', {
          progressBar: true,
          timeOut: 2000,
          progressAnimation: 'decreasing',
        });
      },
      error: () => {
        alert('Credenciales incorrectas');
      },
    });
  }
}
