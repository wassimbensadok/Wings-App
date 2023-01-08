import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserRegisterComponent} from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ClprfComponent } from './components/clprf/clprf.component';
import { DemandeAddComponent } from './components/demande-add/demande-add.component';
import { ListDemComponent } from './components/list-dem/list-dem.component';
import { ModifDemComponent } from './components/modif-dem/modif-dem.component';
import { HomeComponent } from './components/home/home.component';
import { DeliveryRegisterComponent } from './components/delivery-register/delivery-register.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { ModifyOfferComponent } from './components/modify-offer/modify-offer.component';
import { ListOfferComponent } from './components//list-offer/list-offer.component';
import { AllListOfferComponent } from './components/all-list-offer/all-list-offer.component';
import { RequestsComponent } from './components/requests/requests.component';
import { UserProRegisterComponent } from './components/user-pro-register/user-pro-register.component';
import { RequestSendComponent } from './components/request-send/request-send.component';
import { BecomeDeliveryComponent } from './components/become-delivery/become-delivery.component';
import { BecomeVendorComponent } from './components/become-vendor/become-vendor.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { CardComponent } from './components/card/card.component';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { SearchComponent } from './components/search/search.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import { UserguardGuard } from './_guard/userguard.guard';
import { DeliveryguardGuard } from './_guard/deliveryguard.guard';
import { VonderguardGuard } from './_guard/vonderguard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'delivery-register', component: DeliveryRegisterComponent },
  { path: 'userPro-register', component: UserProRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile-main', component: ProfileMainComponent,canActivate: [UserguardGuard]},
  { path: 'clprf', component: ClprfComponent},
  { path: 'add-demand', component: DemandeAddComponent, canActivate: [UserguardGuard]},
  { path: 'list-demand', component: ListDemComponent, canActivate: [UserguardGuard]},
  { path: 'modifier-demande', component: ModifDemComponent, canActivate: [UserguardGuard]},
  { path: 'add-offer', component: AddOfferComponent, canActivate: [DeliveryguardGuard]},
  { path: 'modify-offer', component: ModifyOfferComponent, canActivate: [DeliveryguardGuard]},
  { path: 'list-offer', component: ListOfferComponent, canActivate: [DeliveryguardGuard]},
  { path: 'offers', component: AllListOfferComponent, canActivate: [UserguardGuard]},
  { path: 'requests', component: RequestsComponent, canActivate: [DeliveryguardGuard]},
  { path: 'requests-send', component: RequestSendComponent, canActivate: [UserguardGuard]},
  { path: 'become-delivery', component: BecomeDeliveryComponent},
  { path: 'become-vendor', component: BecomeVendorComponent},
  { path: 'add-product', component: AddProductComponent, canActivate: [VonderguardGuard]},
  { path: 'list-product', component: ListProductComponent, canActivate: [VonderguardGuard]},
  { path: 'email_verification', component: EmailVerificationComponent},
  { path: 'card', component: CardComponent, canActivate: [VonderguardGuard]},
  { path: 'Category/:name', component: CategoryComponent},
  { path: 'Subcategory/:category/:subcategory', component: SubCategoryComponent},
  { path: 'cart', component: CartComponent},
  { path: 'productItem/:productItem', component: ProductItemComponent},
  { path: 'modify-product/:id', component: ModifyProductComponent, canActivate: [VonderguardGuard]},
  { path: 'search/:search', component: SearchComponent},
  { path: 'list-orders', component: ListOrderComponent, canActivate: [UserguardGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserguardGuard,VonderguardGuard,DeliveryguardGuard]
})
export class AppRoutingModule { }
