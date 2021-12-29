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

  constructor(private testService:TestServiceService,private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.addressForm = this._formBuilder.group({
      AddressesArray : this._formBuilder.array([ this.createAddressRow() ])
    })

  }

  onAddNew_VV(): void{
    this.AddressesArray = this.addressForm.get('AddressesArray') as FormArray;
    this.AddressesArray.push(this.createAddressRow());
  }

  createAddressRow(): FormGroup {
    return this._formBuilder.group({
      viral_video_1_title: [''],
      viral_video_1_URL: ['']
    });
  }

}
