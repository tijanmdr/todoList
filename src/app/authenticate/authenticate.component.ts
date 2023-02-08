import { ApiService } from './../services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent {
  authenticateForm !: FormGroup;
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private FormBuilder: FormBuilder,
    private api: ApiService) { }

  password_confirmation: string = "";

  _snackbar_settings:Object= {
    horizontalPosition: "right",
    verticalPosition: "bottom",
    duration: 5000
  }

  _snackbar_btn_text = 'OK'

  url: number = 0;

  ngOnInit() {
    this.authenticateForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      password: ['', Validators.required],
    })

    if (this.router.url.includes('register')) {
      this.url = 1
    }
  }

  login(): void {
    if (this.authenticateForm.valid) {
      this.api.getUser(this.authenticateForm.controls['email'].value, this.authenticateForm.controls['password'].value)
        .subscribe({
          next: (res) => {
            this.authenticateForm.reset()
            if (res.length > 0) {
              this._snackBar.open("Login successful!", this._snackbar_btn_text, this._snackbar_settings);
              localStorage.setItem('user', JSON.stringify(res))
              this.router.navigate(['/'])
            } else {
              this._snackBar.open("Couldn't find user. Please try again!", this._snackbar_btn_text, this._snackbar_settings);
            }

          }, error: (res) => {
            this._snackBar.open("Server Error!", this._snackbar_btn_text, this._snackbar_settings);
          }
        })

    } else {
      this._snackBar.open("Something wrong with the registration data. Please fill up the inputs correctly!", "Close", {
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
    }
    console.log(this.router.url);
  }

  register(): void {
    if (this.authenticateForm.valid) {
      if (this.authenticateForm.controls['password'].value === this.password_confirmation) {
        this.api.postUser(this.authenticateForm.value)
          .subscribe({
            next: (res) => {
              this.authenticateForm.reset()
              this._snackBar.open("Account creation successful!", this._snackbar_btn_text, this._snackbar_settings);
              this.router.navigate(['/login'])

            }, error: (res) => {
              this._snackBar.open("Server Error!", this._snackbar_btn_text, this._snackbar_settings);
            }
          })
      } else {
        this._snackBar.open("Passwords does not match!", this._snackbar_btn_text, this._snackbar_settings);
      }
    } else {
      this._snackBar.open("Something wrong with the registration data. Please fill up the inputs correctly!", this._snackbar_btn_text, this._snackbar_settings);
    }
  }
}
