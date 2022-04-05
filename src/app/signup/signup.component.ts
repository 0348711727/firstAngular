import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User;
  formValue!: FormGroup;

  constructor(private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: ['']
    })
  }
  signup (data: any) {
    this.api.signup(data).subscribe((res) => {
      alert("Sign up thanh cong")
    },err => console.log(err))
  }

}
