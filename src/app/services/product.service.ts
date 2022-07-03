import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { IProduct } from '../iproduct';
import { Observable } from 'rxjs';
import { WishListAPI } from '../wishlistAPI';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   url="https://localhost:5001/api"



  constructor(private http:HttpClient) { }

  getData():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.url+'/Products');
  }

  getSingleProduct(product_id: Number): Observable<IProduct> {
  return this.http.get<IProduct>(this.url + '/Products' + product_id);
  }

  getProductsFromCategory(title: String): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + '/Products/category' + title);
  }

  addProduct(val:any){
    return this.http.post(this.url+'/Products/',val)
  }

  UpdateProduct(val:any){
    return this.http.put(this.url+'/Products',val)
  }

  deleteProduct(val:any){
    return this.http.delete(this.url+'/Products/'+val)
  }


    

  }





