import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  setError(errorCode: number): void {
    switch (errorCode) {
      case 401:
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

    const result: any = this.callDummyApi(username, password);
    
    if (!!result.error) {
      this.setError(result.error.code);
      this.snackBar.open('Login Failed');
    } else {
      this.snackBar.open('Login Successful');
      this.router.navigate(['']);
    }
  }

  callDummyApi(username: string, password: string): any {
    if (username === 'foo' && password === 'bar') {
      return {
        result: {
          status: 'OK',
          code: 200,
          message: 'Login successful',
          data: {
            username: "foo",
            displayName: "Foo",
            roles: []
          }
        },
      };
    } else {
      return {
        error: {
          status: 'Unauthenticated',
          code: 401,
          message: 'Incorrect credentials',
        },
      };
    }
  }
}
