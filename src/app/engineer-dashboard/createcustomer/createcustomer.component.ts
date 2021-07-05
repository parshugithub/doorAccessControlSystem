import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerProfile } from 'src/app/modal/customer-profile';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.scss']
})
export class CreatecustomerComponent implements OnInit {
  date: Date;
  data:any;
  registerDate: any;
  customerProfile=new CustomerProfile();
  constructor(public datepipe: DatePipe,private route: ActivatedRoute, public _service: RegistrationService, public _router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
  }
  addcustomer()
  {
    let engID = this.route.snapshot.params['engID'];
console.log("waudhwqudhwqd",engID)
    this.date = new Date();
    this.registerDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
   var customerId= (<HTMLInputElement>document.getElementById("customerid")).value;
   var email = (<HTMLInputElement>document.getElementById("email")).value;
   this.customerProfile.customerID=customerId;
   this.customerProfile.customerEmail=email;
   this.customerProfile.createdDate=this.registerDate;
   console.log("the object is",this.customerProfile)
   this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
console.log("this is for local data",this.data.engID);

   this._service.customeRegistration(engID,this.customerProfile).subscribe(
    data => {
     if(data!=null)
     {
      // localStorage.setItem("acesscontroldata", JSON.stringify(data));
      this.toaster.success("Customer created Successfully")
      let engineerData = JSON.parse(localStorage.getItem("acesscontroldata"));
console.log("this is the engineer data",engineerData)
if(engineerData.engineerName){
  this._router.navigate(['/allCustomers',engineerData.engID])

}else{
  this._router.navigate(['/engineer-dashboard'])


}
       
     }

    },
    error => {
      console.log("this is error credentials", error)
      this.toaster.error("Internal Server error")



    }
  )

   


  }
  goReturn(){
    let engID = this.route.snapshot.params['engID'];


    this._router.navigate(['/allCustomers',engID])

  }


}
