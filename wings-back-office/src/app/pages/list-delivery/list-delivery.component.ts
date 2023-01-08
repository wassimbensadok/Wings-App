import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.css']
})
export class ListDeliveryComponent implements OnInit {

  currentUser: any;
  livreurs: any;
  currentDemand = null;
  currentIndex = -1;
  currentDelivery: any | undefined;
  cinFrontURL: string = '';
  cinBackURL: string = '';

  public searchFilter: any = '';
  query:string= '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private aa: DashboardService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveadmin();


  }

  retrieveadmin(): void {
    this.aa.getDelivery()
      .subscribe(
        data => {
          this.livreurs = data;
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
  verif() { }
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
  details(delivery: any) {
    this.aa.get(delivery).subscribe(
      data => {
        console.log(data);
        this.currentDelivery = data;
      },
      error => {
      });
    (document.getElementById("myModalII") as HTMLInputElement).style.display = "block";
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveadmin();
  }

  open(cinFront: any, cintBack: any): void {
    this.cinFrontURL = cinFront;
    this.cinBackURL = cintBack;
    (document.getElementById("myModal") as HTMLInputElement).style.display = "block";

  }

  close(): void {
    (document.getElementById("myModal") as HTMLInputElement).style.display = "none";
  }
}
