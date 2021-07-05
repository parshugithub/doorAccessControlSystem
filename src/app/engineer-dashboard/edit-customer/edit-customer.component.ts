import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerProfile } from 'src/app/modal/customer-profile';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  customerProfile=new CustomerProfile();
  msg = '';
engID:any;
  constructor(public router: Router,private route: ActivatedRoute,public datepipe: DatePipe, public _service: RegistrationService,  private toaster: ToastrService) { }

  ngOnInit(): void {
    let custId = this.route.snapshot.params['custID'];
    console.log("this is for customer id",custId)
    this._service.getCustomer(custId)
      .subscribe(data => {
        this.updateSingleCustomerProfile(data);
      }, error => console.log(error));
  }


  updateSingleCustomerProfile(customerProfile) {
    this.customerProfile = customerProfile;
   
  }
  onSubmit() {
    this.updateCustomerProfile();    
  }


  // updateCustomerProfile(){
  //    console.log("this is for updated customer",this.customerProfile);
  // let custId = this.route.snapshot.params['custID'];
  // let engineerData = JSON.parse(localStorage.getItem("acesscontroldata"));

  // // let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  //  //let engID = this.route.snapshot.params['engID'];
  
  //   this._service.updateCustomerData(custId,this.customerProfile).subscribe(
  //     (res) => {
  //         this.msg='successfully Customer updated';
  //       this.toaster.success(this.msg);
  //       this.router.navigate(['/allCustomers',engineerData.engID])

  //     },
  //     error => {
  //       this.msg = error.error;
  //       this.toaster.error(this.msg);
  
  
  //     }
  //   )
  //  }
  
  updateCustomerProfile(){
    //   console.log("called")
       console.log("this is for updated customer",this.customerProfile);
    let custId = this.route.snapshot.params['custID'];
  
      this._service.updateCustomerData(custId,this.customerProfile).subscribe(
        (res) => {
            this.msg='successfully Customer updated';
          this.toaster.success(this.msg);
          let engID = JSON.parse(localStorage.getItem("EngineerID"));
        
            this.router.navigate(['/allCustomers',engID])
  
        
        },
        error => {
          this.msg = error.error;
          this.toaster.error(this.msg);
         
  
        }
      )
     }

  // goBack(){
  //   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  //   console.log("this is stored  all customers data",data); 
  //   if(data.custID){
  //     this.router.navigate(['/allCustomers',data.engId])

  //   }else{
  //   this.router.navigate(['/allCustomers',data.engID])
  //   }
  // }
  
  goBack(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let engID = JSON.parse(localStorage.getItem("EngineerID"));

    console.log("this is stored  all customers data",data); 
    if(data.custID){
      this.router.navigate(['/allCustomers',data.engId])

    }else if(engID){

      this.router.navigate(['/allCustomers',engID])

    }
    
    else{
    this.router.navigate(['/allCustomers',data.engID])
    }
    
  }


}
