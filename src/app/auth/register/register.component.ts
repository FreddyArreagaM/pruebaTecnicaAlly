import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';


function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const words = value.trim().split(/\s+/);
  return words.length >= 3 ? null : { fullName: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _toastrService: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50), fullNameValidator]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name, email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this._toastrService.success('Bienvenido, Ingreso exitoso', 'Sistema', {
          progressBar: true,
          timeOut: 2000,
          progressAnimation: 'decreasing',
        });
      },
      error: () =>
        this._toastrService.error(
          'Error al registrar. Intenta con otro correo.',
          'Sistema',
          {
            progressBar: true,
            timeOut: 2000,
            progressAnimation: 'decreasing',
          }
        ),
    });
  }
}
