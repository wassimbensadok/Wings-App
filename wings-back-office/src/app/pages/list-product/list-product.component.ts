import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {


  currentUser: any;
  produits: any;
  currentDemand = null;
  currentIndex = -1;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  public searchFilter: any = '';
  query:string= '';
  constructor( private aa : DashboardService,private token:TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrievePro();
   
 
  }
  
  retrievePro(): void {
    this.aa.getAllPro()
      .subscribe(
        data => {
          this.produits = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePro();
    this.currentDemand = null;
    this.currentIndex = -1;
  }
  Desactiver(id: any){
    this.aa.EnabelPro(id)
      .subscribe(
        data => {
          this.ngOnInit();
        },
        error => {
          console.log(error);
          this.ngOnInit();
        });
  }

  Activer(id: any){
    this.aa.DesabelPro(id)
      .subscribe(
        data => {
          this.ngOnInit();
        },
        error => {
          console.log(error);
          this.ngOnInit();
        });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrievePro();
  }
}
