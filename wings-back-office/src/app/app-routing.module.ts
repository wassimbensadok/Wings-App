import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './Agent/delivery/delivery.component';
import { ListAccountDeliveryComponent } from './Agent/list-account-delivery/list-account-delivery.component';
import { ListNewDeliveryComponent } from './Agent/list-new-delivery/list-new-delivery.component';
import { ListNewVendorsComponent } from './Agent/list-new-vendors/list-new-vendors.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AddCatSubcatComponent } from './pages/add-cat-subcat/add-cat-subcat.component';
import { AddInvoiceComponent } from './pages/add-invoice/add-invoice.component';
import { HomeComponent } from './pages/home/home.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListComplaintComponent } from './pages/list-complaint/list-complaint.component';
import { ListDeliveryComponent } from './pages/list-delivery/list-delivery.component';
import { ListInvoiceComponent } from './pages/list-invoice/list-invoice.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ListVendorComponent } from './pages/list-vendor/list-vendor.component';
import { LoginComponent } from './pages/login/login.component';
import { ModifyAdminComponent } from './pages/modify-admin/modify-admin.component';
import { ModifyInvoiceComponent } from './pages/modify-invoice/modify-invoice.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'add-admin', component: AddAdminComponent,canActivate: [AuthGuard]},
  { path: 'modify-admin', component: ModifyAdminComponent },
  { path: 'list-admin', component: ListAdminComponent },
  { path: 'list-delivery', component: ListDeliveryComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'list-invoice', component: ListInvoiceComponent },
  { path: 'add-invoice', component: AddInvoiceComponent },
  { path: 'modify-invoice', component: ModifyInvoiceComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'list-vendor', component: ListVendorComponent },
  { path: 'list-complaint', component: ListComplaintComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'list-new-vendors', component: ListNewVendorsComponent },
  { path: 'list-new-delivery', component: ListNewDeliveryComponent },
  { path: 'list-account-delivery', component: ListAccountDeliveryComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'gestion-catégorie', component: AddCatSubcatComponent},
  { path: 'orders', component: OrdersComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
