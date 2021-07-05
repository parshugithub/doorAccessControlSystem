import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/modal/customer';
import { Createuser } from 'src/app/modal/createuser';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { RegistrationService } from 'src/app/service/registration.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  engineerAdminLogged:any;

  voiceoperatorUserLogged:any;
  msg="";
  oldPassword:any;
  newPassword:any;
  conformPassword:any;
customer=new Customer();
logOutCustomer=new Customer();
user=new Createuser()

updateCustomer=new Customer()


  public iconOnlyToggled = false;
  public sidebarToggled = false;
  
  constructor(public _service: RegistrationService,  public _router: Router,private userService:UserService,private toaster:ToastrService) {
  }

  ngOnInit(): void {
        this.engineerAdminLogged=true;

    this.voiceoperatorUserLogged  = true;
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

else{
  console.log("isdjwudfhwedfwedfwe")
}

 //   setTimeout(() => {
  //     localStorage.clear();
  //     this._router.navigate(['/login']);
  // }, 1.08e+7);  //3hours

//   setTimeout(() => {
//     localStorage.clear();
//     this._router.navigate(['/login']);
// },3600 * 1000);  //1hour


//   setTimeout(() => {
//     localStorage.clear();
//     this._router.navigate(['/login']);
// },64000);  //3.6 seconds

// setTimeout(() => {
//   localStorage.clear();
//   this._router.navigate(['/login']);
// },7200 * 1000);  //2hour
 
}

  onLogout() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.logOutCustomer=data;
    if(this.logOutCustomer.userName){
      console.log("this is the user object",this.logOutCustomer);

this.userService.userLogout(this.logOutCustomer).subscribe(
      (res) => {
        console.log("this is the user logout response",res);
        // this.router.navigate(['/staffmanagement'])
         this._router.navigate(['login'])
   localStorage.removeItem('data');
   localStorage.clear();
   window.location.reload();
      },
      error => {
        console.log("error exception");
        this.msg = error.error;


      }
)

    }else{
      console.log("this this is the customer logout object", this.logOutCustomer)
    this.userService.customerLogout(this.logOutCustomer).subscribe(
      (res) => {
        console.log("this is the customer logout response",res);
        this._router.navigate(['login'])
        localStorage.removeItem('data');
        localStorage.clear();
        window.location.reload();
      },
      error => {
        console.log("error exception");
        this.msg = error.error;


      }
    )
    }
  }
  user_settings(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

    console.log("this is customer object",this.customer)
    this.userService.updateProfileData(data.id,this.customer).subscribe(
      (data) => {
        console.log(data);
        this.msg='successfully profile updated';
        this.toaster.success(this.msg);
        localStorage.setItem("acesscontroldata", JSON.stringify(data));

      },
      error => {
        this.msg = "something went wrong";
        this.toaster.error(this.msg);
      }
    )
  }

change_password(){
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));
this.updateCustomer.firstname=data.firstname;
this.updateCustomer.lastname=data.lastname;
this.updateCustomer.address=data.address;
this.updateCustomer.emailId=data.emailId;
this.updateCustomer.mobileNo=data.mobileNo;
this.updateCustomer.userval=data.userval;
this.oldPassword = (<HTMLInputElement>document.getElementById("old_password")).value
this.newPassword = (<HTMLInputElement>document.getElementById("new_password")).value
this.conformPassword = (<HTMLInputElement>document.getElementById("confirm_password")).value
this.updateCustomer.isEnable=false;
this.updateCustomer.password=this.oldPassword;
this.updateCustomer.password=this.newPassword;
this.updateCustomer.confirmPassword=this.conformPassword;
console.log("this is final customer change object",this.updateCustomer);
this.userService.updateProfilePasswordData(data.id,this.updateCustomer).subscribe(
  (data) => {
    console.log(data);
    this.msg='password updated successfully!!!Please check your mail to confirm the mail id and again login';
    this.toaster.success(this.msg);
    this._router.navigate([''])
    localStorage.removeItem('data');
    localStorage.clear();

  },
  error => {
    this.msg = "something went wrong";
    this.toaster.error(this.msg);
  }
)


}


  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  

}
