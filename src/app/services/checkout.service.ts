import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iCustomer } from '../icustomer';



@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
 

  constructor(private httpclient:HttpClient) { }
  getAllCustomers(){
    return this.httpclient.get<iCustomer[]>("https://localhost:5001/api/BillingDetails",
    {
       headers : {"Access-Control-Allow-Origin":"*"}
    });

  }
  addCustomer(data : iCustomer)
  {
    this.httpclient.post<iCustomer>("https://localhost:5001/api/BillingDetails",data,{
      headers : {
        "Access-Control-Allow-Origin" : "*"
       
      }
      
    }).subscribe(data=>{console.log("Done")});
   
  }

  


  



}













