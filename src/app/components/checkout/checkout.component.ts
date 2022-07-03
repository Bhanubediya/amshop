import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {  FormBuilder, FormControl,FormGroup,NgForm,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { iCustomer } from 'src/app/icustomer';

import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

import { IProduct } from 'src/app/iproduct';



declare var Razorpay:any;

@Inject(CheckoutService)
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formValue !: FormGroup;
  checkoutData !: any;
  actionBtn : string = "Save";

  
   firstname:FormControl = new FormControl();
   lastname:FormControl = new FormControl();
   address:FormControl = new FormControl();
   city:FormControl = new FormControl();
   state:FormControl = new FormControl();
   postcode:FormControl = new FormControl();
   mobileno:FormControl = new FormControl();
   emailaddress:FormControl = new FormControl();
   ordernotes:FormControl = new FormControl();
  //  title:FormControl= new FormControl();
   
   customerForm = new FormGroup({

    firstname : new FormControl(""),
    lastname : new FormControl(""),
    address : new FormControl(""),
    city: new FormControl(""),
    state : new FormControl(""),
    postcode : new FormControl(""),
    mobileno : new FormControl(""),
    emailaddress : new FormControl(""),
    ordernotes : new FormControl(""),
    // title : new FormControl(""),

  })

  public product:any=[];
  public grandTotal!:number;
  public totalItem: number=0;
  public titlename:IProduct[]=[];
  billingdetails!:iCustomer[];
  public shopedmore:boolean=false;
  checkoutForm: FormGroup;
  submitted = false;
  checkoutInfoService: any;
  BillingDetailService: any;
  
 
 
 
 


  constructor(private cartService: CartService,private toastr:ToastrService , private checkoutservice:CheckoutService,
    private formBuilder: FormBuilder,
    private http: HttpClient) 
  { 
     
    this.checkoutForm=this.formBuilder.group({
      firstname: ["",Validators.required],
      lastname:["",Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      state:["",Validators.required], 
      postcode:["",Validators.required],
      mobileno:["",Validators.required],
      emailaddress:["",[Validators.required,Validators.email]],
      ordernotes:["",Validators.required],
      
    })
    
  
   
  }
  get f() { return this.checkoutForm.controls; }

  ngOnInit():void{

    this.cartService.getProducts()
    .subscribe(res=>{
      this.product=res;
      this.grandTotal=this.cartService.getTotalPrice();
    })
    this.cartService.getProducts()
    .subscribe(res=>{
    this.totalItem = res.length;
  })
  
  this.cartService.getProducts()  
  .subscribe(res=>{
    this.product=res;
  })
 
  this.checkoutservice.getAllCustomers().subscribe(data=> this.billingdetails = data);
  
  if(this.grandTotal>5000){
  this.shopedmore=true;
  this.toastr.success('Free shipping specially for you','Wohhoo!',{
positionClass:'toast-top-full-width'
  });
  }
  else{
    this.toastr.info(`₹100 has been charged to you`,`Shop more than 5000`,{
      positionClass: 'toast-top-full-width',
      timeOut:2000
    })
  }

  


}

//razorpay payment integration

message:any;
paymentId = "";
error = "";
title1 = 'razorpay-intergration';
options = {
  "key": "rzp_test_KMuAYKn5Hl8vDL",
  "amount": this.grandTotal,
  "name": "Devashish Kapadnis",
  "description": "Payment Details",
  "order_id": "",
  "handler": function (response: any) {
    var event = new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );
    window.dispatchEvent(event);
  },
  "prefill": {
    "name": "",
    "email": "",
    "contact": ""
  },
  "notes": {
    "address": ""
  },
  "theme": {
    "color": "#3399cc"
  }
};


    

  


paynow() {
  this.paymentId = '';
  this.error = '';
  if(this.grandTotal<5000){
  this.options.amount = this.grandTotal*100+10000;
  }
  else{
    this.options.amount = this.grandTotal*100;
  }//paise
  this.options.prefill.name = "deva";
  this.options.prefill.email = "devashishkapadnis075@gmail.com";
  this.options.prefill.contact = "7058204270-";
  var rzp1 = new Razorpay(this.options);
  rzp1.open();
  rzp1.on('payment.failed', function (response: any) {
    //this.message = "Payment Failed";
    // Todo - store this information in the server
    console.log(response.error.code);
    console.log(response.error.description);
    console.log(response.error.source);
    console.log(response.error.step);
    console.log(response.error.reason);
    console.log(response.error.metadata.order_id);
    console.log(response.error.metadata.payment_id);
    //this.error = response.error.reason;
  }
  );

  
}

@HostListener('window:payment.success', ['$event'])
onPaymentSuccess(event: any): void {
  this.message = "Success Payment";
}

saveData(){
  let customer:iCustomer = {
    firstname: this.firstname.value,
    lastname: this.lastname.value,
    address: this.address.value,
    city: this.city.value,
    state: this.state.value,
    postcode: parseInt(this.postcode.value),
    mobileno: parseInt(this.mobileno.value),
    emailaddress: this.emailaddress.value,
    ordernotes: this.ordernotes.value,
    // products:{
    // title: this.title.value,
    // }
  
  };

  this.checkoutservice.addCustomer(customer);
  alert("Customer added succesfully");
  this.checkoutInfoService.getData();
}



onSubmit(){
  console.log(this.checkoutForm);

  // if(this.checkoutForm.valid){
  //   console.log(this.checkoutForm.value);
  // }

  // onSubmit(form:NgForm){
  //   this.service.addCustomers(
  //     (     res: any) => {

  //    },
  //     (     err: any)=>console.log(err);
  //   );

    
     
    
    
    
  }

}

//onCheckout(product:iCustomer){
//  this.service.addCustomers(product)
//  }




  






