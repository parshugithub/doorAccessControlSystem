import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Customer } from 'src/app/modal/customer';
import { RegistrationService } from 'src/app/service/registration.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  msg='';
  mailReference:any;
  passwordReference:any;
customer =new Customer();
  constructor(public _service: RegistrationService,private toaster:ToastrService,public _router: Router,private userService: UserService) { }

  ngOnInit(): void {
      this._router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.reloadDashboard();
    });
  }

  reloadDashboard(){
    window.location.reload();
  
  }


  changePassword(){    
    this.mailReference = (<HTMLInputElement>document.getElementById("mailId")).value
    this.passwordReference = (<HTMLInputElement>document.getElementById("passwordRefer")).value
console.log("thiis for the mail",this.mailReference);
console.log("thiis for the passwoprd",this.passwordReference);
this.customer.emailId=this.mailReference;
this.customer.password=this.passwordReference;
console.log("this is for the change password object",this.customer)
this._service.changePasswordSubmit(this.customer).subscribe(
  (res) => {
    console.log(res);
    // this.msg="Password Changed Successfully "
    window.alert("Password Changed Successfully");
    window.location.reload();

    this._router.navigate(['login']);
  },
  error => {
    // this.msg = error.error;
    this.toaster.error(error);


  }
)
  }




}
