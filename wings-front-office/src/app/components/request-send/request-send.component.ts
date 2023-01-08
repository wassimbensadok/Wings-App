import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticeService } from 'src/app/_service/notice.service';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-request-send',
  templateUrl: './request-send.component.html',
  styleUrls: ['./request-send.component.css']
})
export class RequestSendComponent implements OnInit {
  currentUser: any;
  invitations: any;
  currentIndex:any;
  currentInvi:any = null;


  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  form = new FormGroup({
    rate: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)
  });

  constructor( private offerService : OfferService,private token: TokenStorageService, private noticeService: NoticeService ) { }
  
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
    this.offerService.getInvitationByUser(this.currentUser.id)
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


  cancel(id: any):void {
    
    this.offerService.cancelInvitation(id)
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
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrieveInvitation();
  }

  submit(){
    const data = {
      text_notice : this.form.value.comment,
      note : this.form.value.rate,
      userId : this.currentInvi
    }
    console.log(data);
    this.noticeService.createSpecificNotice(data)
      .subscribe(
        data => {
          console.log(data);
         
        },
        error => {
          if(error.status == "200"){
            console.log(error);
          }
        });
  }

  logout(): void {
    this.token.signOut();
    window.location.pathname = 'login';
  }
}