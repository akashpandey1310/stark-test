import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addUserForm!: FormGroup;
  message = '';

  AddressesArray!: FormArray;

  addressArray: any;

  resp:any;
  submitForm: Object = {};

  constructor(
    private testService: TestServiceService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.addUserForm = this._formBuilder.group({
    //   AddressesArray: this._formBuilder.array([this.createAddressRow()]),
    // });

    this.addUserForm = this._formBuilder.group({

      fname: ['', Validators.required],
      lname: ['', Validators.required],
      addresses: this._formBuilder.array([this.createAddressRow()])
    });
  }

  onAddNew_AddressRow(): void {
    this.AddressesArray = this.addUserForm.get('addresses') as FormArray;
    console.log(typeof this.AddressesArray)
    this.AddressesArray.push(this.createAddressRow());
  }

  createAddressRow(): FormGroup {
    return this._formBuilder.group({
      street: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  get AddressesArray_controls() {
    // a getter!
    return (<FormArray>this.addUserForm.get('addresses')).controls;
  }

  onDeleteAddress(index: number) {
    (<FormArray>this.addUserForm.get('addresses')).removeAt(index);
  }

  onSubmit() {
    console.log(this.addUserForm.value);
 const data = this.addUserForm.value
    this.testService.create(data).subscribe(res => {
      console.log(res)
      this.resp = JSON.stringify(res)
      this.message = 'The users was created successfully!';
    },
    error => {
      console.log(error);
    });




  }
}
