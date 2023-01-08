import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  Orders: any;
  ComItems: any;
  id: any;
  name!: string;
  TotalPrice: number = 0;
  Total: number = 0;
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  public searchFilter: any = '';
  query: string = '';
  constructor(private aa: DashboardService) { }

  ngOnInit(): void {

    this.loadJsFile("assets/libs/jquery/jquery.min.js");
    this.loadJsFile("assets/libs/bootstrap/js/bootstrap.bundle.min.js");
    this.loadJsFile("assets/libs/metismenu/metisMenu.min.js");
    this.loadJsFile("assets/libs/simplebar/simplebar.min.js");
    this.loadJsFile("assets/libs/node-waves/waves.min.js");
    this.loadJsFile("assets/js/app.js");
    this.retrieveCom();

  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  retrieveCom(): void {
    this.aa.getCommand()
      .subscribe(
        data => {
          this.Orders = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.retrieveCom();
  }

  detail(id: any, firstname: string, lastname: string) {
    this.name = firstname + " " + lastname;
    this.id = id;
    this.aa.getComItem(id)
      .subscribe(
        data => {
          console.log(data);
          this.ComItems = data;
          this.TotalPrice = this.ComItems[0].command.totalPrice;
    this.Total = this.TotalPrice + 7;
    console.log(this.ComItems[0].command.totalPrice);
    console.log(this.Total);
        });


    

  }
}
