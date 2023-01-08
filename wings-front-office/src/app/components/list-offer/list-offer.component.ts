import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {
  currentUser: any;
  offers: any;
  currentDemand = null;
  currentIndex = -1;
  type = '';
  tel_receiver = '';
  destination = '';
  etatdemand = '';
  colis: boolean = false;
  envolope: boolean = false;
  express: boolean = false;
  normal: boolean = false;
  ready: boolean = false;


  
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private token: TokenStorageService , private offerSercice: OfferService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.loadJsFile("assets/js/dropdown.js"); 
    this.retrieveDemand();
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  retrieveDemand(): void {
    this.offerSercice.getOfferByUser(this.currentUser.id)
      .subscribe(
        data => {
          this.offers = data;
          
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ok():void{

  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveDemand();
  }
}
