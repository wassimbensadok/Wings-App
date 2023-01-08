import { Component, OnInit } from '@angular/core';
import { DemandService } from 'src/app/_service/demand.service';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  currentUser: any;
  invitations: any;
  currentIndex:any;
  currentInvi:any = null;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor( private offerService : OfferService,private token: TokenStorageService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveInvitation();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
 
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  
  retrieveInvitation(): void {
    this.offerService.getInvitationByDelivery(this.currentUser.id)
      .subscribe(
        data => {
          this.invitations=data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  open(invitation: any): void {
    this.currentInvi = invitation;
    (document.getElementById("myModal") as HTMLInputElement).style.display = "block";
    
  }

  close(): void {
    (document.getElementById("myModal") as HTMLInputElement).style.display = "none";
  }


  confirm(id: any):void {
    
    this.offerService.acceptInvitation(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
          
        },
        error => {
          if(error.status == "200"){
          this.ngOnInit();
          }
        });
  }

  delete(id: any):void {
    
    this.offerService.refuseInvitation(id)
      .subscribe(
        data => {
          this.ngOnInit();
         
        },
        error => {
          if(error.status == "200"){
          this.ngOnInit();
          }
        });
  }
  
  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveInvitation();
  }

}