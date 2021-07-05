
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RegistrationService } from '../service/registration.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _service:RegistrationService,public _router:Router) { }

    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    
     data = JSON.parse(localStorage.getItem("acesscontroldata"));
    //  userData = JSON.parse(localStorage.getItem("userdata"));


    
    
  canActivate(): boolean {
    if ((this._service.loggedIn()!=null) ) 
    {
      console.log('true')
      console.log("this is the entire data",this.data);
      setTimeout(() => {
        localStorage.clear();
        this._router.navigate(['/login']);
      },7200 * 1000);  //2hour
       
      // setTimeout(() => {
      //   localStorage.clear();
      //   this._router.navigate(['/login']);
      // },3400 * 3);  //2hour
       

      return true;
      
    } else if((this._service.forgotcodeIn()!=null)) {
      console.log('true')
      console.log(this.data);
         
   
    }else if((this._service.engineerKLoggedIn()!=null)) {
      console.log('true')
      console.log(this.data);
         
   
    }
    else{
      this._router.navigate(['/login'])
      return false;
    }
  }

  
}

