import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_service/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Categorys: any;
  SubCategorys: any;
  RandomProducts: any;
  ProductI:any ;
  ProductII:any ;
  constructor(private shopeService: ShopService) { }

  ngOnInit(): void {
    this.getCategory();
  this.getProduct();
  this.getProductII();
    this.getRandomPro();
  }

  getCategory() {
    this.shopeService.getCategory()
      .subscribe(
        response => {
          this.Categorys = response;
        },
        error => {
          console.log(error);
        });
  }

  getRandomPro() {
    this.shopeService.getRandomPro()
      .subscribe(
        response => {
          console.log(response);
          this.RandomProducts = response;
        },
        error => {
          console.log(error);
        });
  }

  getProduct(): void {
    this.shopeService.getProComBySubCatAndActivePro("ORDINATEURS")
      .subscribe(
        data => {
          this.ProductI = data;
          
        },
        error => {
          console.log(error);
        });
  }

  getProductII(): void {
    this.shopeService.getProComBySubCatAndActivePro("ORDINATEURS")
      .subscribe(
        data => {
          this.ProductII = data;
          
        },
        error => {
          console.log(error);
        });
  }

  selectChangeHandler(id:any) {
    this.shopeService.getSubCategoryByCategory(id)
      .subscribe(
        data => {
          this.SubCategorys = data;
        });
  }
}
