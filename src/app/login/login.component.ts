import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  isErr!: string;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })

  }
  logIn() {
    this._http.get<any>('http://localhost:3000/users').subscribe((res) => {
      const userFind = res.find((user: any) => {
        return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password
      })
      if(!userFind) {
        this.isErr = 'Email or password is incorrect'
      }
      else {
      alert('login success')
      this.router.navigate(['dashboard'])
    }
    })
  }
}
