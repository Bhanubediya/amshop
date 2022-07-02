import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iCustomer } from '../icustomer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService { 

  constructor(private http:HttpClient) { }

  addCustomer(checkout : iCustomer){
     this.http.post<iCustomer>("https://localhost:5001/api/BillingDetails",checkout, {
       headers:{
         "Access-Control-Allow-Origin":"*"
    }
    }).subscribe((result)=>console.log("Data entered in Database Successfully !"));
     }
     
     getCustomer(){
     this.http.get("https://localhost:5001/api/BillingDetails",{
      headers:{
         "Access-Control-Allow-Origin":"*"
       }
     });
    }
    
}
