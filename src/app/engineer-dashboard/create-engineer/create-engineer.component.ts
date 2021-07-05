import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Engineer } from 'src/app/modal/engineer';
import { EngineerService } from 'src/app/service/engineer.service';

@Component({
  selector: 'app-create-engineer',
  templateUrl: './create-engineer.component.html',
  styleUrls: ['./create-engineer.component.scss']
})
export class CreateEngineerComponent implements OnInit {
  msg = '';
  date: Date;
createDate:any;
  constructor(public engineerService:EngineerService,public datepipe: DatePipe, public router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
  }
  engineer= new Engineer();
  data = JSON.parse(localStorage.getItem("acesscontroldata"));


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  createEnginner(){

    this.date = new Date();
    this.createDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.engineer.createdDate=this.createDate;
    console.log("this is for create engineer object",this.engineer);
     this.engineerService.create(this.engineer).subscribe(
      ( res) =>{ 
        console.log("ksdfksd;fklsd;l",res);
        this.router.navigate(['/engineer-dashboard']);
       this.msg='Engineer created successfully';
       this.toaster.success(this.msg);
     },
       error =>{
     this.msg='The Engineer with employeeID Or UserName or Password  already exists';
     this.toaster.error(this.msg);

       
     })
       }  



       goBack(){
        this.router.navigate(['/engineer-dashboard'])
      }

}
