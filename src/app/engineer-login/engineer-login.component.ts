import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Engineer } from '../modal/engineer';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-engineer-login',
  templateUrl: './engineer-login.component.html',
  styleUrls: ['./engineer-login.component.scss']
})
export class EngineerLoginComponent implements OnInit {
  engineer=new Engineer();
  msg = '';

  constructor(public _service: RegistrationService, public _router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this._router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.refreshPage();
    });
  }

  refreshPage() {
    console.log("this is for refresh page")
    window.location.reload();
  }

  engineer_Logged(){
    console.log("this is for engineer logged in object",this.engineer);
    this._service.loginEngineer(this.engineer).subscribe(
      data => {

        if (data.engineerName) {
console.log("this is for data engineer",data);
this._router.navigate(['/allCustomers',data.engID]);

          // this.loggedIn.next(true);
          // console.log(data)
          // this.sourceData = data;
          localStorage.setItem("acesscontroldata", JSON.stringify(data));
          // this._router.navigate(['dashboard']);
           this.msg = 'successfully logged in';
          this.toaster.success(this.msg);
          // console.log("sdfhsdj", data);
          // window.location.reload();
        }

      },
      error => {
        console.log("this is error credentials", error)
        this.msg = "Check the Credentails or varify the account"
        this.toaster.error(this.msg);


      }
    )

  }



}
