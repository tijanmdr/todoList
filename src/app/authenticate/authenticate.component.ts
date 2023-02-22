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

  password_confirmation: string = ""; // to confirm with the password if they match or not

  url: number = 0; // 0 - login and 1 - register (validated on ngInit())

  ngOnInit() {
    // Form builder with the validator set
    this.authenticateForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      password: ['', Validators.required],
    })

    if (this.router.url.includes('register')) { // check if the current page is register or login
      this.url = 1
    }
  }

  /**
   * Button callback from the form
   */
  authenticate() {
    if (this.authenticateForm.valid) { // check if the form is valid or not
      (this.url === 0) ? this.login() : this.register();
    } else {
      this.openSnackBar('Something wrong with the registration data. Please fill up the inputs correctly!')
    }
  }

  /**
   * Login functionality 
   */
  login(): void {
    // api call for login data
    this.api.getUser(this.authenticateForm.controls['email'].value, this.authenticateForm.controls['password'].value)
      .subscribe({
        next: (res) => {
          this.authenticateForm.reset() // reset form after login
          if (res.length > 0) {
            this.openSnackBar("Login successful!")
            localStorage.setItem('user', JSON.stringify(res[0])) // set user details in localstorage
            this.router.navigate(['/'])
          } else {
            this.openSnackBar("Couldn't find user. Please try again!")
          }

        }, error: (res) => {
          this.openSnackBar('Server Error!')
        }
      })
  }

  /**
   * Register functionality
   */
  register(): void {
    if (this.authenticateForm.controls['password'].value === this.password_confirmation) {
      this.authenticateForm.value.admin = 1; // normal users always set to 1
      this.api.postUser(this.authenticateForm.value)
        .subscribe({
          next: (res) => {
            this.authenticateForm.reset() // reset form data
            this.openSnackBar('Account creation successful!')
            this.router.navigate(['/login'])

          }, error: (res) => {
            this.openSnackBar('Server Error!')
          }
        })
    } else {
      this.openSnackBar('Passwords does not match!')
    }
  }

  /**
   * Snack bar to show mesage that is dismissible
   * @param msg message to show
   */
  openSnackBar(msg: string) {
    this._snackBar.open(msg, "OK", {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
