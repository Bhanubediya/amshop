import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

import { CheckoutProductsComponent } from './components/checkout-products/checkout-products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
  path: '',component: HomeComponent
  },
  {
    path:"add-customer",component:CheckoutComponent
  },

  {
    path: 'checkout-products', component:CheckoutProductsComponent
  },
  {
    path:'checkout', component:CheckoutComponent
  },
  {
    path:'thankyou',  component:ThankyouComponent
  },
  {
    path:'wishlist',  component:WishlistComponent
  },
  {
    path:'admin-panel',  component:AdminPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
