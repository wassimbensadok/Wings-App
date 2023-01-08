import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.css']
})
export class ListVendorComponent implements OnInit {
  public searchFilter: any = '';
  query:string= '';
  currentUser: any;
  vendeurs: any;
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
    this.aa.getvendeur()
      .subscribe(
        data => {
          this.vendeurs = data;
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

 onTableDataChange(event: any) {
  this.page = event;
  this.retrieveadmin();
}
}
