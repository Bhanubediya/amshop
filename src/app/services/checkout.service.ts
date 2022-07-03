import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { iCustomer } from '../icustomer';



@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  url="https://localhost:5001/api"

  constructor(private http:HttpClient) { }
  getData():Observable<iCustomer[]>{
    return this.http.get<iCustomer[]>(this.url+'/BillingDetails');
  }

  
  addCustomers(val : iCustomer)
  {
    this.http.post<iCustomer>("https://localhost:5001/api/BillingDetails",val,{
      headers : {
        "Access-Control-Allow-Origin" : "*"
       
      }

    }).subscribe(result => console.log("Done"));
  }



  deleteCustomer(val:any){
    return this.http.delete(this.url+'/BillingDetails/'+val)
  }



}













