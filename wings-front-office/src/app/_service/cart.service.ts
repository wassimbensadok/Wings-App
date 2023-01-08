import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { IOrderItem } from "../interface/iorder-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private subject = new BehaviorSubject<IOrderItem[]>([]);
	private orderItems$: Observable<IOrderItem[]> = this.subject.asObservable();

  constructor() {
     
  }

  getItems():Observable<IOrderItem[]>{
    return  this.orderItems$ = JSON.parse(localStorage.getItem('cart')!);
  }

  addItem(orderItem: IOrderItem) {
    const orderItems = JSON.parse(localStorage.getItem('cart')!) ?? [];
		const productIndex = orderItems.findIndex((item: { product: { id: number; }; }) => item.product.id === orderItem.product.id);
		if (productIndex >= 0) {
			const updatedOrderItem = orderItems[productIndex];
			updatedOrderItem.quantity += 1;
			const newOrderItems = orderItems.slice(0);
			newOrderItems[productIndex] = {
				...orderItems[productIndex],
				...updatedOrderItem
			}
		} else {
			orderItems.push(orderItem)
		}

		this.subject.next(orderItems);
        localStorage.setItem('cart', JSON.stringify(orderItems));
  }
 

  updateItem(orderItem: IOrderItem,q:number){
    const orderItems = JSON.parse(localStorage.getItem('cart')!) ?? [];
		const productIndex = orderItems.findIndex((item: { product: { id: number; }; }) => item.product.id === orderItem.product.id);
		if (productIndex >= 0) {
			const updatedOrderItem = orderItems[productIndex];
			updatedOrderItem.quantity = q;
			const newOrderItems = orderItems.slice(0);
			newOrderItems[productIndex] = {
				...orderItems[productIndex],
				...updatedOrderItem
			}
		} else {
			orderItems.push(orderItem)
		}

		this.subject.next(orderItems);
        localStorage.setItem('cart', JSON.stringify(orderItems));
  }


  DeleteItem(orderItem: IOrderItem) {
    const orderItems = JSON.parse(localStorage.getItem('cart')!) ?? [];
		const productIndex = orderItems.findIndex((item: { product: { id: number; }; }) => item.product.id === orderItem.product.id);
    orderItems.splice(productIndex,1);
    localStorage.setItem('cart', JSON.stringify(orderItems));
  }

  ClearItem(){
    localStorage.clear();
  }
}