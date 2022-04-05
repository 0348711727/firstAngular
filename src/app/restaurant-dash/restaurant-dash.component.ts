import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  allRestaurantData: any;
  restaurantModel: RestaurantData = new RestaurantData;
  isModalShown: boolean = true;
  showAddForm!: boolean;
  showEditForm!: boolean;
  titleModal!: string;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      service: [''],
    })
    this.getRestaurant()
  }
  setValue() {
    this.restaurantModel.name = this.formValue.value.name
    this.restaurantModel.email = this.formValue.value.email
    this.restaurantModel.phone = this.formValue.value.phone
    this.restaurantModel.address = this.formValue.value.address
    this.restaurantModel.service = this.formValue.value.service
  }
  callAddForm() {
    this.titleModal = 'Add Restaurant'
    this.formValue.reset();
    this.showAddForm = true;
    this.showEditForm = false;
  }
  addRestaurant() {
    this.setValue()

    this.api.postRestaurant(this.restaurantModel).subscribe((res) => {
      // console.log(res);
      // alert('Add restaurant success')
      this.formValue.reset()
      this.getRestaurant()
    },
      err => console.log(err))
  }
  getRestaurant() {
    this.api.getRestaurant().subscribe((res) => this.allRestaurantData = res)
  }
  deleteRestaurant(data: any) {
    this.api.delRestaurant(data).subscribe((res) => {
      this.getRestaurant()
    }, err => console.log(err))
  }
  onEditRestaurant(data: any) {
    this.titleModal = 'Edit Restaurant'
    this.showAddForm = false;
    this.showEditForm = true;
    this.restaurantModel.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['phone'].setValue(data.phone)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['service'].setValue(data.service)
  }
  updateRes() {
    this.setValue()
    console.log(this.restaurantModel)
    this.api.updateRestaurant(this.restaurantModel, this.restaurantModel.id).subscribe((res) => {
      alert('Update successfully')
      this.getRestaurant();
      console.log(res)
    })
  }
}
