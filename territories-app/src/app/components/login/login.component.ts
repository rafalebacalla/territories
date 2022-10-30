import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DummyApi } from 'src/app/utils/DummyApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: any | undefined = undefined;
  errorMessage: string = '';
  currentUser = false;

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
    private router: Router,
    private dataService: DataService
    ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.dataService.currentLoggedInUser.subscribe(currentUser => this.currentUser = currentUser);
    if (!!this.currentUser) this.router.navigate(['']);
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
      this.dataService.changeLoginStatus(result);
      this.router.navigate(['']);
    }
  }
}
