import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/modal/sitemodal';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {
  msg='';
  site= new Site();
  data = JSON.parse(localStorage.getItem("acesscontroldata"));

  constructor(
    private router: Router,public userService: UserService,
    public siteService:SitemanagementService,private toaster:ToastrService
  ){ }
  ngOnInit(): void {
    console.log("id",this.data.id)

   
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  createSite(){
    console.log(this.site);
    console.log("id",this.data)
     this.siteService.create(this.data.id,this.site).subscribe(
      ( res) =>{ 
        console.log("ksdfksd;fklsd;l",res);
       this.router.navigate(['/dashboard']);
       this.msg='site created successfully';
       this.toaster.success(this.msg);
     },
       error =>{
     this.msg='The Site with sitename Or deviceID  already exists';
     this.toaster.error(this.msg);

       
     })
       }  




       

       goBack(){
        this.router.navigate(['/dashboard'])
      }



}


  
  
   

 
