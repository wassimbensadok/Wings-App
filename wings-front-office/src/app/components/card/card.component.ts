import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_service/shop.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card = {
    ShopName: '',
    type:'',
    commercial_register:'',
    WebSite : ''
  }
  currentCard: any;
  currentUser:any;
  currentFile: any;
  url: any;
  constructor(private token: TokenStorageService,private shopService : ShopService) { 
    
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadCard();
    this.loadJsFile("assets/js/dropdown.js"); 
    (document.getElementById("ShopName") as HTMLInputElement).readOnly=true;
    (document.getElementById("type") as HTMLInputElement).disabled=true;
    (document.getElementById("WebSite") as HTMLInputElement).readOnly=true;
   
    
  }
  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
    
  }  

  loadCard(){
    this.shopService.get(this.currentUser.id)
    .subscribe(
      data => {
        this.card.ShopName = data.shopName;
        this.card.type = data.type;
        this.card.WebSite = data.webSite;
        if(data.type == 'Personne physique'){
          (document.getElementById("1") as HTMLInputElement).checked=true;
        }
        if(data.type == 'Entité commerciale / Entreprise'){
          (document.getElementById("2") as HTMLInputElement).checked=true;
        }
      });
  }

  save() {

  }

  modify() {
    (document.getElementById("ShopName") as HTMLInputElement).readOnly=false;
    (document.getElementById("type") as HTMLInputElement).disabled=false;
    (document.getElementById("WebSite") as HTMLInputElement).readOnly=false;
  }


  
  selectFile(event:any): void {
    this.currentFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

}
