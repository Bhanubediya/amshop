import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iCustomer } from '../icustomer';



@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpclient:HttpClient) { }
  getAllCustomers():Observable<iCustomer[]>{
    return this.httpclient.get<iCustomer[]>("https://localhost:44386/api/BillingDetails",
    {
      headers:{"Access-Control-Allow-Origin":"*"}
    });
    
  }

  
  addCustomer(Data : iCustomer)
  {
    this.httpclient.post<iCustomer>("https://localhost:44386/api/BillingDetails",Data,{
      headers : {
        "Access-Control-Allow-Origin" : "*"
       
      }

    }).subscribe(result => console.log("Done"));
  }






}













