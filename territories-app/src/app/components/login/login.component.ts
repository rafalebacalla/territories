import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isLoggedIn } from 'src/app/utils/AuthChecker';
import { DummyApi } from 'src/app/utils/DummyApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: any | undefined = undefined;
  errorMessage: string = '';

  loginValidation = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'incorrect', message: 'Wrong username' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'incorrect', message: 'Wrong password' },
    ],
  };

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
    ) {
      if (isLoggedIn()) this.router.navigate(['']);
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  setError(errorCode: number): void {
    switch (errorCode) {
      case 404:
        this.loginForm.controls['password'].setErrors({ incorrect: true });
        this.loginForm.controls['username'].setErrors({ incorrect: true });
        break;
      default:
        this.loginForm.controls['username'].setErrors({ incorrect: true });
        this.loginForm.controls['password'].setErrors({ incorrect: true });
    }
  }

  async submitLoginForm() {
    if (this.loginForm.status === 'INVALID') {
      this.snackBar.open('Invalid details');
      return;
    }

    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;

    const result: any = DummyApi.login(username, password);
    
    if (!!result.message) {
      this.setError(404);
      this.snackBar.open('Login Failed');
    } else {
      this.snackBar.open('Login Successful');
      localStorage.setItem('user', JSON.stringify(result));
      this.router.navigate(['']);
    }
  }
}
