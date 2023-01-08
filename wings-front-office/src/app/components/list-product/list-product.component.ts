import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_service/shop.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  currentUser: any;
  produits: any;
  currentproduit = null;
  currentIndex =-1;
  filter: string = '';
  nompr= '';
  prixpr='';
  descpr='';
  poidspr='';
  hauteurpr='';
  quantitepr= '';
  

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private token: TokenStorageService , private shopeSevice: ShopService) { }
  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveproduit();
  
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js");
   
  
   
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  
  retrieveproduit(): void {
    
      this.shopeSevice.get(this.currentUser.id)
      .subscribe(
        data => {
          console.log(data);
          this.shopeSevice.getProComByCard(data.id)
          .subscribe(
            data => {
              this.produits = data;
              console.log(this.produits);
            },
            error => {
              console.log(error);
            });

        });
    
  
   
  }
  refreshList(): void {
    this.retrieveproduit();
    this.currentproduit = null;
    this.currentIndex = -1;
  }

  DeletePro(id:any): void {
    this.shopeSevice.deleteProById(id)
      .subscribe(
        data => {
          
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveproduit();
  }


}

