import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  currentUser: any;
  admins: any;
  currentDemand = null;
  currentIndex = -1;
 

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor( private aa : DashboardService,private token:TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveadmin();
   
 
  }
  
  retrieveadmin(): void {
    this.aa.getAdminAndAgent()
      .subscribe(
        data => {
          this.admins = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveadmin();
    this.currentDemand = null;
    this.currentIndex = -1;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveadmin();
  }
}
