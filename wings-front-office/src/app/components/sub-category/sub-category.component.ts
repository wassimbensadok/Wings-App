import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interface/iproduct';
import { CartService } from 'src/app/_service/cart.service';
import { ShopService } from 'src/app/_service/shop.service';
import { IOrderItem } from 'src/app/interface/iorder-item';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  Products : any;
  category :any;
  subcategory : any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private shopService : ShopService,private route: ActivatedRoute,
    private router: Router,private cartService: CartService) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.subcategory = this.route.snapshot.paramMap.get('subcategory');
    console.log(this.category);
    console.log(this.subcategory);
    this.getProduct(this.subcategory);
    
  }

  getProduct(name:any): void {
    console.log(name);
    this.shopService.getProComBySubCatAndActivePro(name)
      .subscribe(
        data => {
          console.log(data);
          this.Products = data;
          console.log(this.Products);
          console.log(this.Products.length);
          
        },
        error => {
          console.log(error);
        });
  }

  /*addProduct1(){
    let product1: IProduct = {_id:1, name: 'Product 1', price:25.00};
    let orderItem: IOrderItem = { product: product1, quantity:1};
    this.cartService.addItem(orderItem);
  }*/

  add(id: any,name:string ,price:any,image:string ) {
		
		let product1: IProduct = { id: id, name: name, price: price, image: image};
		let orderItem: IOrderItem = { product: product1, quantity: 1 };
    console.log(orderItem);
		this.cartService.addItem(orderItem);
		
	}

  onTableDataChange(event: any) {
    this.page = event;
    this.getProduct(this.subcategory);
  }
 

}
