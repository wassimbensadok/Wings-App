import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { ClprfComponent } from './components/clprf/clprf.component';
import { ListDemComponent } from './components/list-dem/list-dem.component';
import { ModifDemComponent } from './components/modif-dem/modif-dem.component';
import { HomeComponent } from './components/home/home.component';
import { DeliveryRegisterComponent } from './components/delivery-register/delivery-register.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { ListOfferComponent } from './components/list-offer/list-offer.component';
import { ModifyOfferComponent } from './components/modify-offer/modify-offer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DemandeAddComponent } from './components/demande-add/demande-add.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from './_service/auth.service';
import { CurrencyPipe } from '@angular/common';
import { AllListOfferComponent } from './components/all-list-offer/all-list-offer.component';
import { RequestsComponent } from './components/requests/requests.component';
import { UserProRegisterComponent } from './components/user-pro-register/user-pro-register.component';
import { RequestSendComponent } from './components/request-send/request-send.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BecomeDeliveryComponent } from './components/become-delivery/become-delivery.component';
import { BecomeVendorComponent } from './components/become-vendor/become-vendor.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { CardComponent } from './components/card/card.component';
import { CategoryComponent } from './components/category/category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './_service/cart.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { SearchComponent } from './components/search/search.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import { UserguardGuard } from './_guard/userguard.guard';
import { VonderguardGuard } from './_guard/vonderguard.guard';
import { DeliveryguardGuard } from './_guard/deliveryguard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserRegisterComponent,
    LoginComponent,
    ProfileMainComponent,
    ClprfComponent,
    DemandeAddComponent,
    ListDemComponent,
    ModifDemComponent,
    HomeComponent,
    DeliveryRegisterComponent,
    AddOfferComponent,
    ListOfferComponent,
    ModifyOfferComponent,
    AllListOfferComponent,
    RequestsComponent,
    UserProRegisterComponent,
    RequestSendComponent,
    SidenavComponent,
    BecomeDeliveryComponent,
    BecomeVendorComponent,
    AddProductComponent,
    ListProductComponent,
    EmailVerificationComponent,
    CardComponent,
    CategoryComponent,
    SubCategoryComponent,
    CartComponent,
    ProductItemComponent,
    ModifyProductComponent,
    SearchComponent,
    ListOrderComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,MatListModule,MatInputModule,MatNativeDateModule,
    NoopAnimationsModule,MatMenuModule,MatDividerModule,MatIconModule,MatDatepickerModule,MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    ImageCropperModule
  ],
  providers: [AuthService,CurrencyPipe,CartService,UserguardGuard,VonderguardGuard,DeliveryguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
