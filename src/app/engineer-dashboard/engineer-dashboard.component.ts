import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Engineer } from '../modal/engineer';
import { EngineerService } from '../service/engineer.service';

@Component({
  selector: 'app-engineer-dashboard',
  templateUrl: './engineer-dashboard.component.html',
  styleUrls: ['./engineer-dashboard.component.scss']
})
export class EngineerDashboardComponent implements OnInit {
  engineers: Engineer[] = [];
  searchText;
  confirmation:boolean = true;

  constructor(public engineerService:EngineerService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getAllEngineers();
  }

getAllEngineers(){
  this.engineerService.getAll().subscribe((engineerListResponse: Engineer[])=>{
    this.engineers = engineerListResponse;
    console.log("this is for all users",this.engineers);

    // for(let i=0;i<this.engineers.length;i++){
    //   console.log("this is for single user",this.engineers[i]);
    // }
  })  
}


update(engID){
  console.log(engID)
  this.router.navigate(['engineer-dashboard/edit-engineer',engID]);

}

allCustomers(engID){
  localStorage.setItem("EngineerID", JSON.stringify(engID));
  console.log("thi is the all customer id",engID)
  this.router.navigate(['allCustomers',engID]);

}
createCustomer(engID){
  console.log("thi is the create ustomer",engID)
  
  this.router.navigate(['createcustomer',engID]);

}

deleteEngineerCalling(engID){



  this.confirmation=confirm("Are you sure to delete -" +engID)
  
  if(this.confirmation==true)
  {
  console.log(engID)
  this.engineerService.deleteEngineer(engID)
  .subscribe((res)=>{
  this.getAllEngineers();
  
  this.toaster.success(res);
  },
  (err) => {
  console.log(err);
  this.toaster.success(err);

  }
  
  );
  
  }
  else{
  
  }
  
  }



}
