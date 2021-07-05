import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from 'src/app/modal/createuser';
import { UserType } from 'src/app/modal/userType';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  clicked = false;

  msg = '';
   errorMessage: any = [];

  // user: Createuser[] = [];
  data = JSON.parse(localStorage.getItem("acesscontroldata"));
// errorResponse=new Error();
  user = new Createuser();

  // id = JSON.parse(localStorage.getItem("acesscontroldata"));


  usertypes = [
    {
      id: "webAppAdmin",
      name: "webAppAdmin"
    },
    {
      id: "customerAdmin",
      name: "customerAdmin"
    },
    {
      id: "siteAdmin",
      name: "siteAdmin"
    },
    {
      id: "engineer",
      name: "engineer"
    },
    {
      id: "Voice Operator",
      name: "Voice Operator"
    }
  ];

  user_type = "siteAdmin";

  user_type2 = {
    id: "uk",
    name: "United Kingdom"
  };

  compareFn(c1: UserType, c2: UserType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }





  ngOnInit() {
    
  }

  constructor(
    private router: Router,
    public userService: UserService,private toaster:ToastrService
  ) { }



  createUser() {
    console.log("this s sjkdn sx",this.user)

    this.userService.create(this.user,this.data.id).subscribe(
      (res) => {
        console.log("qwduhsdbsdwed",res)
            this.router.navigate(['/usersmanagement'])
        this.msg='user created successfully';
        this.toaster.success(this.msg);
      
      },
      error => {
        console.log("this is for the catching error exception",error);
        let errorData = error.error;
        let errorValue = JSON.parse(errorData)      
        console.log("wdqwdqw",errorValue.message) 
        this.toaster.success(errorValue.message);


      
      }
    )
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  goBack() {
    this.router.navigate(['/usersmanagement'])
  }



  

}