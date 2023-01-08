import { IProduct } from 'src/app/interface/iproduct';

export interface IOrderItem {
    product: IProduct; 
    quantity: number;
}
