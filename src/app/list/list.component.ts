import { Component, OnInit } from '@angular/core';
import { TestServiceService } from '../service/test-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userss: any;
  currentusers: any;
  currentIndex = -1;
  title = '';

  constructor(private testService: TestServiceService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.testService.getAll()
      .subscribe(
        data => {
          this.userss = data.data;
          console.log(data);
          console.log(data.data);

        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentusers = null;
    this.currentIndex = -1;
  }

  setActiveusers(users: any, index: number): void {
    console.log(users);
    console.log(users.data);
    this.currentusers = users;
    this.currentIndex = index;
  }

}
