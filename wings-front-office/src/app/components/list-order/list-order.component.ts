import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticeService } from 'src/app/_service/notice.service';
import { ShopService } from 'src/app/_service/shop.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { UserService } from 'src/app/_service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  currentUser: any;
  currentCom: any;
  Commands : any;
  ComItems : any;
  User : any;
  isSuccessful = false;
  isSignUpFailed = false;
  form = new FormGroup({
    rate: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)
  });
  constructor(private token : TokenStorageService,private shopService : ShopService , private userService : UserService,  private noticeService: NoticeService ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
   
    this.retrieveCommand();
    this.getUser();
    
    
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
    
  }  

  getUser(): void {
    this.userService.getUserById(this.currentUser.id)
      .subscribe(
        data => {
          this.User=data;
          console.log(this.User);
        },
        error => {
        });
  }

  retrieveCommand(): void {
    this.shopService.getcomByUser(this.currentUser.id)
      .subscribe(
        data => {
          console.log(data);
          this.Commands = data;
        });
  }
 
  getComItem(id:any){
    //await this.sleep(1000);
    this.shopService.getComItem(id)
      .subscribe(
        data => {
          console.log(data);
          this.ComItems = data;
        });
  }
  

  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  open(id: any): void {
    this.currentCom = id;
    (document.getElementById("myModal") as HTMLInputElement).style.display = "block";
    
  }

  close(): void {
    (document.getElementById("myModal") as HTMLInputElement).style.display = "none";
  }


  submit(){
   const data = {
      text_notice : this.form.value.comment,
      note : this.form.value.rate,
      productId : this.currentCom
    }
    console.log(data);
    this.noticeService.createProductNotice(data)
      .subscribe(
        data => {
          
          this.isSuccessful =true;
          this.isSignUpFailed = false;
          this.form.reset;
        },
        error => {
          if (error.status == "200") {
          
            this.form.reset;
            this.isSuccessful =true;
            this.isSignUpFailed = false;
          } else {
           
            this.isSuccessful =false;
            this.isSignUpFailed = true;
          }
         
        });
  }
}
