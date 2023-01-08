import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/_service/cart.service';
import { ShopService } from 'src/app/_service/shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  item :any;
  pName: any;
  url : any
  constructor(private shopService : ShopService,private route: ActivatedRoute,
    private router: Router,private cartService: CartService) { }

  ngOnInit(): void {
    this.pName = this.route.snapshot.paramMap.get('productItem')?.substring(0,this.route.snapshot.paramMap.get('productItem')?.indexOf('%'));
    console.log(this.pName);
    this.getProduct(this.pName)
  }

  getProduct(name:any): void {
    console.log(name);
    this.shopService.getProComByProId(name)
      .subscribe(
        data => {
          this.item = data;
          this.url = this.item.product.picture1;
          console.log(this.item);
          
        },
        error => {
          console.log(error);
        });
  }

  onchange(url: any){
    this.url = url;
  }

}
