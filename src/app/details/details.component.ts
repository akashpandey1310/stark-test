import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestServiceService } from '../service/test-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentusers: any;
  message = '';
resp: any
  constructor(
    private testServices: TestServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id:any): void {
    this.testServices.get(id)
      .subscribe(
        data => {
          this.currentusers = data.data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  updateusers(): void {
    this.testServices.update(this.currentusers.id, this.currentusers)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The users was updated successfully!';
          this.resp = JSON.stringify(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteusers(): void {
    this.testServices.delete(this.currentusers.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The users was deleted successfully!';
          this.resp = JSON.stringify(response)
          // this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }



}
