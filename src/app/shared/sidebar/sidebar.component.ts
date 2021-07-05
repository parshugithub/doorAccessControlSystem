import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/modal/customer';
import { RegistrationService } from 'src/app/service/registration.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
    public uiBasicCollapseds = false;

  public samplePagesCollapsed = false;
  customer=new Customer();
  voiceoperatorUserLogged:any;
  engineerAdminLogged:any;
engineerLogged:any;
  
  constructor(public _service: RegistrationService,public _router: Router,private userService:UserService,private toaster:ToastrService) { }

  ngOnInit() {
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });


    this.voiceoperatorUserLogged  = true;
    this.engineerAdminLogged=true;
this.engineerLogged=true;
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
     console.log("this is stored data",data.userName); 

     //if it is user
if(data.userName){
console.log("dycvdgvcgdvcdgvc")
console.log("The user response ",data)
this.customer.firstname=data.firstName;
this.customer.lastname=data.lastName;
this.customer.address=data.address;
this.customer.mobileNo=data.phone_number;
this.customer.emailId=data.email;

console.log("The user response ",this.customer)

//else it is customer
}else{
      console.log("The customer response ",data)
      this.customer.firstname=data.firstname;
this.customer.lastname=data.lastname;

this.customer.address=data.address;
this.customer.emailId=data.emailId;
this.customer.mobileNo=data.mobileNo;
this.customer.password=data.password;
this.customer.confirmPassword=data.confirmPassword;
}

if(data.user_type=="Voice Operator"){
  this.voiceoperatorUserLogged = false;
  console.log("this is voice operator",data.user_type)
}else if(data.userName=="NcsAdmin" && data.password=="Password"){
  console.log("this is for the engineer loged")
  this.engineerAdminLogged=false;
}
else if(data.engineerName){
  localStorage.setItem("engID", data.engID );

  this.engineerLogged=false;
}
else{
  console.log("isdjwudfhwedfwedfwe")
}


    
  }


  gotoAllCustomers(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this is stored  all customers data",data); 
  if(data.custID){
    this._router.navigate(['/allCustomers',data.engId])

  }else{
    this._router.navigate(['/allCustomers',data.engID])
  }
  }
  gotoCreateCustomer(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this is stored  all customers data",data); 
    if(data.custID){
      this._router.navigate(['/createcustomer',data.engId])
  
    }else{
      this._router.navigate(['/createcustomer',data.engID])
    }
  }

}
