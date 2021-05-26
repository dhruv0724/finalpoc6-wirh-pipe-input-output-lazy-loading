import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Employee } from '../models/Employee';
import { Product } from '../models/Products';
import { EmpserviceService } from '../services/empservice.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-emphome',
  templateUrl: './emphome.component.html',
  styleUrls: ['./emphome.component.css']
})
export class EmphomeComponent implements OnInit {
  products : Product[] = [];
  selectoption:string;
  productid : string;
  productname : string;
  productprice:string;
  productdesc:string;
  imageb64:string;
  isUpdate:boolean;

  employee : Employee;

  constructor(private app : AppComponent,
    private empservice : EmpserviceService,
    private router:Router,
    private productservice:ProductService,
    ) { }

  ngOnInit(): void {
    let empId = localStorage.getItem('emp');
    this.empservice.getOne(empId).then((value)=>{
      if(value.success){
        this.employee = value.data;
      }
    });
    this.filter();
  }

  filter(filterOn?:string){
    
    this.productservice.getList().subscribe((value)=>{
      
      if(value.success){
        this.products = value.data;
        this.products = this.products.filter(e=>{
          return !filterOn || e.select_option.search(filterOn) !== -1;
        })
      }else{
        alert(value.message);
      }
    });
  }

  view(product : Product){
    localStorage.setItem('prod',product.product_id);
    this.router.navigateByUrl('/viewproduct');
  }
  gotoaccount(){
    this.router.navigateByUrl('/account');
  }
  checkout(){
    this.router.navigateByUrl('/checkout');
  }
  addtocart(){
  }
}