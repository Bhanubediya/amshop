import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WishListAPI } from 'src/app/wishlistAPI';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
p:any;

searchkey:string='';
public filtercategory : any;
isExistInCart:boolean = false;
public searchterm:string='';
public totalItem1: number=0;
public totalItem: number=0;
wishlistArray:WishListAPI[]=[];
  result:IProduct[]=[];
  constructor(private order:ProductService, private cartService: CartService, private toastr:ToastrService, private wishlist:WishlistService,  private wishlistCartService:WishlistCartService)  { }


  ngOnInit(): void {
    this.order.getData().subscribe((data:IProduct[]) =>{

      this.cartService.getProducts()
      .subscribe(res=>{
      this.totalItem = res.length;
    })
          console.log(data);
          this.result = data;
          //for category

          this.filtercategory = data;

          //for cart
          this.result.forEach((a:any)=>{

            if(a.category === "fasion"){
              a.category = "Shirts for Mens"
            }
            else if(a.category === "girl fasion"){
              a.category = "Tops for Womens"
            }
            else if(a.category === "electronic"){
              a.category = "Laptops"
            }
            else if(a.category === "mobile"){
              a.category = "SmartPhones"
            }
            else{
              a.category = "Watches"
            }
            Object.assign(a,{quantity:1,total:(a.price*a.quantity)})
          });
          console.log(this.result);

        });

        // searchkey
        this.cartService.search.subscribe((val:any)=>{
          this.searchkey=val;

        })

        this.wishlist.getData().subscribe((wishListData:WishListAPI[]) =>{
              console.log(wishListData);
              this.wishlistArray = wishListData;
            });
      }

      findWishlistIndex(product:any){
if(product.addedtowishlist===true){
  this.wishlistArray.indexOf(product.productId)>=0
}
      }

      addtocart(dt:IProduct){
        dt.addedtocart=true;
            this.cartService.addtoCart(dt);
            localStorage.setItem('wishlistcart',JSON.stringify(this.filtercategory))
        }


      filter(category : string){

        this.filtercategory = this.result
        .filter((a:any) =>{
          if(a.category == category || category == ''){
            return a;
          }
        })
      }
      search(event:any){
        this.searchterm=(event.target as HTMLInputElement).value;
        this.cartService.search.next(this.searchterm);
      }


handleaddtowishlist(product:IProduct){
  for(let i=0;i<this.filtercategory.length;i++){
    if(this.filtercategory[i].productId===product.productId){
      this.wishlist.addtoWishlist(this.filtercategory[i].productId,this.filtercategory[i].image,this.filtercategory[i].title,this.filtercategory[i].shortDesc,this.filtercategory[i].price).subscribe(()=>{
        product.addedtowishlist=true;
      });
  }
}
}

addToWishlistCart(dt:WishListAPI){
  this.wishlistCartService.addToWishlistCart(dt);
}

handleremovewishlist(product:any){
  for(let i=0;i<this.filtercategory.length;i++){
    if(this.filtercategory[i].productId=== product.productId){
      this.wishlist.removeWishlist(this.filtercategory[i].productId).subscribe(()=>{
product.addedtowishlist=false;
})
  }
}

}

}











