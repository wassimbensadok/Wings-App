import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/_service/cart.service';
import { IOrderItem } from 'src/app/interface/iorder-item';
import { IProduct } from 'src/app/interface/iproduct';
import { ShopService } from 'src/app/_service/shop.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //myOrderItems$: Observable<IOrderItem[]> | any;
  myOrderItems$: any;
  quantity: any;
  currentUser: any = null;
  comStatus :  any;
  TotalPrice: number = 0;
  Total: number = 0;
  isLoggedIn = false;
  constructor(private cartService: CartService, private shopService: ShopService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    //this.myOrderItems$ = this.cartService.getItems();
    this.myOrderItems$ = JSON.parse(localStorage.getItem('cart')!);
    this.TotalP();
  }

  updatePro(id: any, name: string, price: any, image: string) {
    let product1: IProduct = { id: id, name: name, price: price, image: image };
    let orderItem: IOrderItem = { product: product1, quantity: 1 };
    this.cartService.addItem(orderItem);
    this.ngOnInit;
  }

  onSearchChange($event: any, id: any, name: string, price: any, image: string): void {
    let product1: IProduct = { id: id, name: name, price: price, image: image };
    let orderItem: IOrderItem = { product: product1, quantity: this.quantity };
    this.cartService.updateItem(orderItem, $event.target.value);
    this.ngOnInit;
  }

  deleteItem(id: any, name: string, price: any, image: string) {
    let product1: IProduct = { id: id, name: name, price: price, image: image };
    let orderItem: IOrderItem = { product: product1, quantity: this.quantity };
    this.cartService.DeleteItem(orderItem);
    this.ngOnInit();
  }

  clearitem() {
    this.cartService.ClearItem();
    this.ngOnInit();
  }

  Command() {

    if(!this.isLoggedIn){
      Swal.fire(
        'Oops!',
            "vous devez vous connecter pour passer une commande!",
            'error'
      )
    }else{

    let totalPrice: number = 0;
    this.myOrderItems$.forEach((item: any, index: any) => {
      totalPrice += item.quantity * item.product.price;
    });
    let data = {
      totalPrice: this.Total,
      userId: this.currentUser.id
    }
    this.shopService.command(data)
      .subscribe(
        data => {
          this.myOrderItems$.forEach((item: any, index: any) => {
            let ComItem = {
              quantity: item.quantity,
              price: item.product.price,
              productId: item.product.id,
              commandId: data
            }
            
            this.shopService.comItem(ComItem)
              .subscribe(
                data => {
                  this.comStatus = data;
                  
                },
                error => {
                
                });
          });

          Swal.fire(
            'Bien!',
            'Votre commande est enregistrer!',
            'success'
          )

        },
        error => {
          console.log(error);
        });
      }
  }

  TotalP(){
    this.TotalPrice = 0;
    this.myOrderItems$.forEach((item: any, index: any) => {
      this.TotalPrice += item.quantity * item.product.price;
    });
    let d = this.TotalPrice * (5/100);
    this.Total = this.TotalPrice - d;
  }

}
