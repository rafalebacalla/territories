import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm : any | undefined = undefined;
  errorMessage : string  = '';

  loginValidation = {
    username: [
      { type: 'required', message: 'Username is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ]
  };

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  setError(errorCode : string) : string {
    let errorMessage : any = {}
    switch(errorCode) {
        case "incorrect-details":
          this.loginForm.controls['password'].setErrors({'incorrect': true});
          this.loginForm.controls['username'].setErrors({'incorrect': true});
          break;
        default:
          this.loginForm.controls['username'].setErrors({'incorrect': true});
          this.loginForm.controls['password'].setErrors({'incorrect': true});
      }
    return errorMessage;
  }

  async submitLoginForm(){
    if(this.loginForm.status === 'INVALID') {
      this.snackBar.open('Invalid details');
      return;
    }

    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;

    const result : any = this.callDummyApi(username, password)
    
    if(!!result.error){
      this.setError(result.error.code)
      this.snackBar.open('Login Failed');
    } else {
      this.snackBar.open('Login Successful');
    }
    
  }

  callDummyApi (username : string, password : string) : any {
    if (username === "user" && password === "1234") {
      return {
        result: {
          status: "OK",
          code: 200,
          message: "Login successful"
        }
      }
    } else {
      return {
        error: {
          status: "Unauthenticated",
          code: 401,
          message: "Incorrect credentials"
        }
      }
    }
  }
}
