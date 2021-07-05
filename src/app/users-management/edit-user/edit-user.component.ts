import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from 'src/app/modal/createuser';
import { UserType } from 'src/app/modal/userType';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  username: string;
  user = new Createuser();

  msg = '';
  // user: Createuser[] = [];

  // user= new Createuser();

  id = JSON.parse(localStorage.getItem("acesscontroldata"));

  // user:Createuser;
  // user= new Createuser();


  usertypes = [
    {
      id: "webAppAdmin",
      name: "webAppAdmin"
    },
    {
      id: "ucustomerAdmink",
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


  constructor(private route: ActivatedRoute, private router: Router,private toaster:ToastrService,
    private userService: UserService) { }
  //  user_name:any



  ngOnInit() {
    this.user = new Createuser();
    this.username = this.route.snapshot.params['username'];
    this.userService.getUser(this.username)
      .subscribe(data => {
        this.updateSingleUser(data);
      }, error => console.log(error));
   
  }

  updateSingleUser(user) {
    this.user = user;
   
  }
  onSubmit() {
    this.updateEmployee();    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  updateEmployee(){
  console.log("called")
  console.log(this.user);
  this.userService.updateUserData(this.username,this.user).subscribe(
    (res) => {
      this.router.navigate(['/usersmanagement'])
      this.msg='successfully user updated';
      this.toaster.success(this.msg);
    },
    error => {
      this.msg = error.error;
      this.toaster.error(this.msg);


    }
  )
}

goBack(){
  this.router.navigate(['/usersmanagement'])
}
}