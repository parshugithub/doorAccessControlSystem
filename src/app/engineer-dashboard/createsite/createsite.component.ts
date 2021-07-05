import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Door } from 'src/app/modal/door';
import { EngineerSite } from 'src/app/modal/engineersite';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { BrowserModule } from '@angular/platform-browser'
import { EngineerTotalDoors } from 'src/app/modal/engineertotaldoor';
import { DatePipe, formatDate } from '@angular/common';
import { RegistrationService } from 'src/app/service/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-createsite',
  templateUrl: './createsite.component.html',
  styleUrls: ['./createsite.component.scss']
})
export class CreatesiteComponent implements OnInit 
{
  data:any;
  engineerSite=new EngineerSite();
  doorentity = new EngineerTotalDoors()
  doorentityarray =new Array(128);
  closeResult: string;
  totalDoors: Door[];
  //doorname= new Array();
  doorName:any[]=[];
  deviceId:any[]=[];
  locakTime:any[]=[];
  accessingDoorNumber: any;
  doors: any;
  doorNameval:any;
  today = new Date();
  jstoday = '';
  jstoday1 = '';

  alldoors: number[] = new Array(12);
  custID: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    public ngbModalService: NgbActiveModal,private moveToSite: MoveToSiteService,public datepipe: DatePipe,
     public _service: RegistrationService, public _router: Router, private toaster: ToastrService) { }

  ngOnInit(): void
   {
    this.custID = this.route.snapshot.params['custID'];

console.log("this is the cbfdewf",this.custID)
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      // console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      // console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })

   
  }


  addsite()
  {
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.engineerSite.createdDate=this.jstoday1;
    console.log("the site object is ",this.engineerSite);
    this._service.AddSite(this.data.custID,this.engineerSite).subscribe(
      data => {
       if(data!=null)
       {
         console.log("the respose is ",data)
         this.toaster.success("Site created successfully")
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));  
         this._router.navigate(['/sitedashboard', this.custID])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )
  
     
  
  
  

  }
  addDoor(i)
  {
    console.log("the objecty is ",this.doorentity);
    var obj=this.doorentity;
    this.doorentityarray.push(obj)

  }

  doorname(event,i,val)
  {
    console.log("dhaskjdh",val)
    var value="";
  //  this.doorNameval= this.doorNameval+val

    console.log("events is ",value.concat(val));
    this.doorentity.doorNo=Number(value.concat(val))
    // this.doorName.push(value)

  }
  deviceid(event,i,val)
  {
    var value="";
    console.log("events is ",event);
    this.doorentity.doorDeviceId=Number(value.concat(val))
   // this.deviceId.push(val)

  }
  HR(event,i,val)
  {
    console.log("events is ",event)
    console.log("ksjsjf",val);
    this.doorentity.doorType=val;


  }
  // NR(event,i,val)
  // {
  //   console.log("events is ",event)
  //   console.log("ksjsjf",val)

  // }

  locktime(event, i,val) {
    this.locakTime.push(val)
    console.log("eukj34hu34f", event, i);
    var value="";
    console.log("events is ",event);
    this.doorentity.locktime=value.concat(val)

  }
  goReturn(){
    let custId = this.route.snapshot.params['custID'];
    this._router.navigate(['/sitedashboard',custId])

  }

}
