import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { SliderComponent } from './Components/slider/slider.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AddInvoiceComponent } from './pages/add-invoice/add-invoice.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListDeliveryComponent } from './pages/list-delivery/list-delivery.component';
import { ListInvoiceComponent } from './pages/list-invoice/list-invoice.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListVendorComponent } from './pages/list-vendor/list-vendor.component';
import { LoginComponent } from './pages/login/login.component';
import { ModifyAdminComponent } from './pages/modify-admin/modify-admin.component';
import { ModifyInvoiceComponent } from './pages/modify-invoice/modify-invoice.component';
import { ListComplaintComponent } from './pages/list-complaint/list-complaint.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './Agent/agent-dashboard/agent-dashboard.component';
import { DeliveryComponent } from './Agent/delivery/delivery.component';
import { ListNewDeliveryComponent } from './Agent/list-new-delivery/list-new-delivery.component';
import { ListNewVendorsComponent } from './Agent/list-new-vendors/list-new-vendors.component';
import { ListAccountDeliveryComponent } from './Agent/list-account-delivery/list-account-delivery.component';
import { AuthService } from './Services/auth-service.service';
import { AuthGuard } from './Services/auth.guard';
import { NotifierModule, NotifierOptions} from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './search-filter.pipe';
import { AddCatSubcatComponent } from './pages/add-cat-subcat/add-cat-subcat.component';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    AddAdminComponent,
    AddInvoiceComponent,
    InvoiceComponent,
    ListAdminComponent,
    ListDeliveryComponent,
    ListInvoiceComponent,
    ListProductComponent,
    ListUsersComponent,
    ListVendorComponent,
    LoginComponent,
    ModifyAdminComponent,
    ModifyInvoiceComponent,
    ListComplaintComponent,
    InboxComponent,
    AdminDashboardComponent,
    AgentDashboardComponent,
    DeliveryComponent,
    ListNewDeliveryComponent,
    ListNewVendorsComponent,
    ListAccountDeliveryComponent,
    SearchFilterPipe,
    AddCatSubcatComponent,
    HomeComponent,
    OrdersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
