import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';
import{Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[]=[];
  loading =true;
  maxid:number=0;

  constructor(){ 
    this.products = JSON.parse(localStorage.getItem('products')?localStorage.getItem('products'):'[]');
    this.sort();
  }
  sort(){
    this.products.sort((a,b)=>{
      return a.product_id>b.product_id?1:-1;
    });
  }
  save(product: Product): Observable<Response> {
    return new Observable<Response>((obs)=>{
        this.products.push(product);
      
      localStorage.setItem('products',JSON.stringify(this.products));
      let respose = {success:true,message:"Saved",data:product} as Response;
      obs.next(respose);
    });
  }


  delete(id: string): Observable<Response> {
    return new Observable((obs)=>{
      let deleteCLientIndex = this.products.findIndex(product=>{
        return product.product_id== id;
      });
      if (deleteCLientIndex !== -1) {
        this.products.splice(deleteCLientIndex, 1);
      }
      localStorage.setItem('products',JSON.stringify(this.products));
      let respose = {success:true,message:"Deleted",data:deleteCLientIndex} as Response;
      obs.next(respose);
    });
  }
  getList(): Observable<Response> {
    return new Observable((obs)=>{
      this.sort();
      let respose = {success:true,message:"Success",data:this.products} as Response;
      obs.next(respose);
    })
  }


  getOne(id: string): Observable<Response> {
    return new Observable((obs)=>{
      let product = this.products.find(product=>{
        return product.product_id == id;
      });
      console.log('Check product',this.products,id)
      let respose:Response;
      if(product){
        respose = {success:true,message:"Found One!!",data:product} as Response;
      }else{
        respose = {success:false,message:"Not Found",data:product} as Response;
      }
      obs.next(respose);
    });
  }
  block(id: string): Observable<Response> {
    return new Observable((obs)=>{
      let product = this.products.find(product=>{
        return product.product_id == id;
      });
      let respose;
      if(!product){
        respose = {success:false,message:"No Employee!!",data:product} as Response;
      }else{
        product.isBlocked = !product.isBlocked;
        this.save(product);
        respose = {success:true,message:"Block Toggled!!",data:product} as Response;
      }
      obs.next(respose);
    });
  }


}
