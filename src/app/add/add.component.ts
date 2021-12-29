import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addUserForm!: FormGroup;
  addressForm!: FormGroup;

  AddressesArray!: FormArray ;

  addressArray: any;

  address_maxLength = 10;

  submitForm: Object = {};

  constructor(private testService:TestServiceService,private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.addressForm = this._formBuilder.group({
      AddressesArray : this._formBuilder.array([ this.createAddressRow() ])
    })

    this.addUserForm = this._formBuilder.group({
     id: [''],
     fname: ['', Validators.required],
     lname: ['', Validators.required],
    })

  }

  onAddNew_AddressRow(): void{
    this.AddressesArray = this.addressForm.get('AddressesArray') as FormArray;
    this.AddressesArray.push(this.createAddressRow());
  }

  createAddressRow(): FormGroup {
    return this._formBuilder.group({
      street_1: [''],
      country_1: [''],
      zip_1: ['']
    });
  }

  onSubmit(){
    console.log(this.addUserForm.value);


    this.addressArray = this.addressForm.value.AddressesArray;

    for(var index=0; index< this.address_maxLength ; index++) {

      var AddresForm = {
        [ `street_${index+1}`] : this.addressArray[index]? this.addressArray[index].street_1: '',
        [ `country_${index+1}`] : this.addressArray[index]? this.addressArray[index].country_1: '',
        [ `zip_${index+1}`] : this.addressArray[index]? this.addressArray[index].zip_1: '',
      }

      Object.assign(this.submitForm, AddresForm)
    }

    var user_form = {
      id: this.addUserForm.value.id,
      fname: this.addUserForm.value.fname,
      lname: this.addUserForm.value.lname,
    }

    Object.assign(this.submitForm, user_form)


  }

}
