import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Site } from 'src/app/modal/sitemodal';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit {

  sitename: string;
  site = new Site();
  msg = '';

  id = JSON.parse(localStorage.getItem("acesscontroldata"));

  constructor(private route: ActivatedRoute,
    private router: Router,
    public siteService:SitemanagementService,private toaster:ToastrService,public userService: UserService
  ){ }



  ngOnInit() {
    this.site = new Site();
    this.sitename = this.route.snapshot.params['sitename'];
    
    this.siteService.getSite(this.sitename)
      .subscribe(data => {
        console.log("getting site", data)
        this.updateSingleSite(data);
      }, error => console.log(error));
    console.log(this.site)
    
  }


  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  updateSingleSite(site) {
    console.log("update site",site)
    this.site = site;
   console.log(site.id)
  }
  onSubmit() {
    this.updateSite();    
  }


  updateSite(){
    console.log("called")
    console.log(this.site);
    this.siteService.updateSiteData(this.sitename,this.site).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
        this.msg='successfully site updated';
        this.toaster.success(this.msg);
      },
      error => {
        console.log("error exception");
        this.msg = error.error;
        this.toaster.error(this.msg);
  
      }
    )
  }
  

  goBack(){
    this.router.navigate(['/dashboard/view-site', this.sitename])
  }
}
