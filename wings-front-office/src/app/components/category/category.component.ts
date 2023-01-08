import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/_service/shop.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Products : any;
  category : any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private route: ActivatedRoute,
    private router: Router, private shopeService : ShopService) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.paramMap.get('name'));
    this.category = this.route.snapshot.paramMap.get('name');
  }

  getProduct(name:any): void {
    console.log(name);
    this.shopeService.getProComByCatAndActivePro(name)
      .subscribe(
        data => {
          console.log(data);
          this.Products = data;
          console.log(this.Products);
          
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getProduct(name);
  }

}
