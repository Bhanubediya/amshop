import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CheckoutProductsComponent } from './components/checkout-products/checkout-products.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './shared/filter.pipe';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { ProductService } from './services/product.service';
import { WishlistService } from './services/wishlist.service';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    CheckoutComponent,
    HomeComponent,
    LoginComponent,
    CheckoutProductsComponent,
    ThankyouComponent,
FilterPipe,
WishlistComponent,
AdminPanelComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCommonModule,

    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressAnimation: 'increasing',
      progressBar:true,
      positionClass:'toast-bottom-right'
        })
  ],
  providers: [ProductService,WishlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
