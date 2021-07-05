import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Createuser } from '../modal/createuser';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
   voice_show: boolean = false;
showVoice:any;
  confirmation:boolean = true;
  public show:boolean = false;
  public buttonName:any = 'Show';
  isShown: boolean = false ; // hidden by default


  private isButtonVisible = true;

voicesArray=[];
  count=1;
  searchText;
data:Createuser[]=[];
  users: Createuser[] = [];
  constructor(public userService:UserService ,private _router:Router,private toaster:ToastrService) { }
  customerResponce;
  response;
  userList:any;
  
  @ViewChild("myDiv") divView: ElementRef;

  ngOnInit(): void {

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.userService.getAll(data.id).subscribe((userListResponse: Createuser[])=>{
      this.users = userListResponse;
      console.log("this is for all users",this.users);

      for(let i=0;i<this.users.length;i++){
        console.log("this is for single user",this.users[i]);
        let userType="Voice Operator";
        let users_type=this.users[i].user_type;

        if(this.users[i].user_type==userType){
           console.log("this i the voice sites",this.users[i]);
          
        }else{
        console.log("this is for execpt voice operator user",this.users[i]);
      
        }
      }
    })  

  }

  

  getAllusers(){
    

    
    
  }

  goToVoiceOperatorSite(userName,user_id){
    console.log("this is for the ",userName);
    console.log("this is for the userid",user_id)

    this._router.navigate(['usersmanagement/voice-operators-site',userName]);

    console.log("this is for voice operator dashboard")
  }


  update(username){
    console.log(username)
    this._router.navigate(['usermanagemet/updateUser',username]);

  }
  
  deleteUserCalling(userName){



    this.confirmation=confirm("Are you sure to delete -" +userName)
    
    if(this.confirmation==true)
    {
    console.log(userName)
    this.userService.deleteUser(userName)
    .subscribe((res)=>{
    this. getAllusers();
    
    this.toaster.success(res);
    },
    (err) => {
    console.log(err);
    }
    
    );
    
    }
    else{
    
    }
    
    }
    



}