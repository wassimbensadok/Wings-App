import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  facteur = {
    nomliv: '',
    nomcl1: '',
    nomcl2: '',
    montant:'',
    date:'',
    type: '',
    
    
  };
 types: boolean=false;
 typess:number= 0;
  submitted: boolean=false;
 
  constructor(private aa:DashboardService) { }

  ngOnInit()   {

  }
  selectype(event:any) {
  if((this.types = event.target.value)=='env'){
    this.facteur.type='envelope'}
else{this.facteur.type='colis' }
}
ajout(): void{

  const data = {
    nomliv: this.facteur.nomliv,
    nomcl1: this.facteur.nomcl1,
    nomcl2: this.facteur.nomcl2,
    montant: this.facteur.montant,
    type: this.facteur.type,
    date: this.facteur.date
  
  };
  console.log(data);
  this.aa.createFacteur(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
      
}
}
