import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public searchFilter: any = '';
  query:string= '';
  currentUser: any;
  users: any;
  currentDemand = null;
  currentIndex = -1;
  dataObject = [];
  filtered: Object[] | undefined
  
   page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor( private aa : DashboardService,private token:TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveuser();
   
 
  }
  
  retrieveuser(): void {
    this.aa.getuser()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveuser();
    this.currentDemand = null;
    this.currentIndex = -1;
  }

  

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveuser();
  }

  enabled(id: any) {
    this.aa.enabledUser(id)
      .subscribe(
        data => {
          this.ngOnInit();
        },
        error => {
          if (error.status == "200") {
            this.ngOnInit();
          }
        });
  }
  disabled(id: any) {
    this.aa.disabledUser(id)
    .subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
        if (error.status == "200") {
          this.ngOnInit();
        }
      });
  }
  details(user: any) {
   
  }
}
