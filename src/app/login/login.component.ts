import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  email: string = "";
  password: string = "";

  ngOnInit() {
  }

  login(): void {
    // if (this.email == 'admin' && this.password == 'admin') {
    //   this.router.navigate(["user"]);
    // } else {
    //   alert("Invalid credentials");
    // }
  }
}
