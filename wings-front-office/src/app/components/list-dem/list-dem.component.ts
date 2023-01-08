import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/_service/address.service';
import { DemandService } from 'src/app/_service/demand.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-list-dem',
  templateUrl: './list-dem.component.html',
  styleUrls: ['./list-dem.component.css']
})
export class ListDemComponent implements OnInit {
  currentUser: any;
  demands: any;
  currentDemand = null;
  currentIndex = -1;
  Governorates : any;
  Citys : any;
  type = '';
  currentGov: string = '';
  currentCity: string = '';
  colis: boolean = false;
  envolope: boolean = false;
  express: boolean = false;
  normal: boolean = false;
  ready: boolean = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  constructor( private demandService : DemandService,private token: TokenStorageService, private addressService : AddressService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
    this.retrieveDemand();
    this.retrieveGov();
 
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  
  retrieveDemand(): void {
    this.demandService.get(this.currentUser.id)
      .subscribe(
        data => {
          this.demands = data;
          
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveDemand();
    this.currentDemand = null;
    this.currentIndex = -1;
  }
ok(){


}

retrieveGov(): void {
  this.addressService.getAllGov()
    .subscribe(
      data => {
        this.Governorates = data;
      });
}

selectChangeHandlerII (event: any) {
  this.addressService.getGovByName(event.target.value)
    .subscribe(
      data => {
        this.addressService.getCityByGov(data)
        .subscribe(
          data => {
            this.Citys = data;
          });
      });   
}

onTableDataChange(event: any) {
  this.page = event;
  this.retrieveDemand();
}
}
