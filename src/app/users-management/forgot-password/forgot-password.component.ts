import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { RegistrationService } from 'src/app/service/registration.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  codeReference:any;
  msg = '';

  constructor(public _service: RegistrationService,private toaster: ToastrService,public _router: Router,private userService: UserService) { }

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
  

  submitCode(){    
    this.codeReference = (<HTMLInputElement>document.getElementById("code")).value;
    let usernameRefer= JSON.parse(localStorage.getItem("forgotData"));
    console.log("this is the username",usernameRefer.userName)

this._service.codeSubmit(this.codeReference,usernameRefer.userName).subscribe(
  (res) => {
    console.log(res);
    var existing = localStorage.getItem('forgotData');
    localStorage.setItem("acesscontroldata", existing);
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));

     if(data.user_type=="Voice Operator"){
      this._router.navigate(['/voice-operator-dashboard']);
      window.alert("code Submitted Successfully");

    }else{
      this._router.navigate(['dashboard'])
      window.alert("code Submitted Successfully");

    }


  },
  error => {
    this.msg = "entered code is wrong";
    this.toaster.error(this.msg);


  }
)
  }

}
