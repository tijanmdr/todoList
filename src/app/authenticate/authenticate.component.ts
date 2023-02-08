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
              this.openSnackBar("Login successful!")
              localStorage.setItem('user', JSON.stringify(res))
              this.router.navigate(['/'])
            } else {
              this.openSnackBar("Couldn't find user. Please try again!")
            }

          }, error: (res) => {
            this.openSnackBar('Server Error!')
          }
        })

    } else {
      this.openSnackBar('Something wrong with the registration data. Please fill up the inputs correctly!')
    }
  }

  register(): void {
    if (this.authenticateForm.valid) {
      if (this.authenticateForm.controls['password'].value === this.password_confirmation) {
        this.api.postUser(this.authenticateForm.value)
          .subscribe({
            next: (res) => {
              this.authenticateForm.reset()
              this.openSnackBar('Account creation successful!')
              this.router.navigate(['/login'])

            }, error: (res) => {
              this.openSnackBar('Server Error!')
            }
          })
      } else {
        this.openSnackBar('Passwords does not match!')
      }
    } else {
      this.openSnackBar('Something wrong with the registration data. Please fill up the inputs correctly!')
    }
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg, "OK", {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
