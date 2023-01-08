import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  currentUser: any;
  facteurs: any;
  currentDemand = null;
  currentIndex = -1;
  nomliv = '';
  nomcl1 = '';
  nomcl2 = '';
  montant = '';
  date = '';
  type = '';
  
  constructor( private aa : DashboardService,private token:TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveuser();
   
 
  }
  
  retrieveuser(): void {
    this.aa.get(this.currentUser.id)
      .subscribe(
        data => {
          this.facteurs = data;
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

}
