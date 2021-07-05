import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Engineer } from 'src/app/modal/engineer';
import { EngineerService } from 'src/app/service/engineer.service';

@Component({
  selector: 'app-edit-engineer',
  templateUrl: './edit-engineer.component.html',
  styleUrls: ['./edit-engineer.component.scss']
})
export class EditEngineerComponent implements OnInit {
  engineer = new Engineer();
  msg = '';

  constructor(private route: ActivatedRoute,public engineerService:EngineerService, private router: Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    let engId = this.route.snapshot.params['engID'];
    console.log("this is for engineer id",engId)
    this.engineerService.getEngineer(engId)
      .subscribe(data => {
        this.updateSingleEngineer(data);
      }, error => console.log(error));
   
  }

  updateSingleEngineer(engineer) {
    this.engineer = engineer;
   
  }
  onSubmit() {
    this.updateEngineer();    
  }


  updateEngineer(){
    console.log("called")
    console.log(this.engineer);
    let engId = this.route.snapshot.params['engID'];

    this.engineerService.updateEngineerData(engId,this.engineer).subscribe(
      (res) => {
        this.router.navigate(['/engineer-dashboard'])
        this.msg='successfully Engineer updated';
        this.toaster.success(this.msg);
      },
      error => {
        this.msg = error.error;
        this.toaster.error(this.msg);
  
  
      }
    )
  }
  goBack(){
    this.router.navigate(['/engineer-dashboard'])
  }

}
