import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { EngineerSite } from 'src/app/modal/engineersite';
import { EngineerTotalDoors } from 'src/app/modal/engineertotaldoor';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-sitedashboard',
  templateUrl: './sitedashboard.component.html',
  styleUrls: ['./sitedashboard.component.scss']
})
export class SitedashboardComponent implements OnInit {

  data:any;
  engineerSite=new EngineerSite();
  engineerSitearray:EngineerSite[];
  doorentity = new EngineerTotalDoors()
  doorentityArray :EngineerTotalDoors[];
  doorentityarray =new Array(128);
  closeResult: string;
  totalDoors: Door[];
  siteid:any;
  custID:any;
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
  constructor(private modalService: NgbModal,
    public ngbModalService: NgbActiveModal,private moveToSite: MoveToSiteService,public datepipe: DatePipe,
     public _service: RegistrationService, public _router: Router, 
     private route: ActivatedRoute,private toaster: ToastrService) { }

  ngOnInit(): void 
  {
    this.custID = this.route.snapshot.params['custID'];
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this._service.getAllSites(this.custID).subscribe(
      data => {
       if(data!=null)
       {
        this.engineerSitearray=data;
         console.log("the respose is ",data)
       
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )

    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      // console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      // console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })

   
  

  }
  update(siteid)
  {

  }
  goReturn(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this is stored  all customers data",data); 
    this._router.navigate(['/allCustomers',data.engId])
  }
  addToSite(){
    console.log("this is the site dahboard",this.custID)
    this._router.navigate(['addsite',this.custID])

  }

  delete(siteid)
  {
    
  }
  getSiteId(siteid)
  {
     this.siteid=siteid

    console.log('the site id is ',siteid);
    this._service.getallDoors(this.data.custID,siteid).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSi=data;
         console.log("the total door respose is ",data);
         this.doorentityArray=data;
         for (let i = 0; i < this.doorentityArray.length; i++) {
           const doornumber = this.doorentityArray[i].doorNo;
           const doordeviceid =this.doorentityArray[i].doorDeviceId;
           const locktime =this.doorentityArray[i].locktime;
           const doortype =this.doorentityArray[i].doorType;



           var door = doornumber.toString();
           var doordevcieId = doordeviceid.toString();
           var locktimefordoor = locktime.toString();
           var doortypemefordoor = doortype.toString();
           (<HTMLInputElement>document.getElementById("doorname" + doornumber)).value=door;
           (<HTMLInputElement>document.getElementById("doorDeviceid" + doornumber)).value=doordevcieId;
           (<HTMLInputElement>document.getElementById("locktime" + doornumber)).value=locktimefordoor;
            (<HTMLInputElement>document.getElementById("doortype" + doornumber)).value=doortypemefordoor;
            // $("#doortype" + doornumber + " option[value=" + doortypemefordoor + "]").attr('selected', 'selected');
           
         }

        //  this.toaster.success("Door created successfully")
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));
        //  this._router.navigate(['/sitedashboard'])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )


  }
  addDoor(i,siteid)
  {
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.doorentity.createdDate=this.jstoday1;
    console.log("the objecty is ",this.doorentity);
    console.log("the siteid  is ",siteid);
    this._service.AddDoor(this.data.custID,siteid,this.doorentity).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSi=data;
         console.log("the respose is ",data)
         this.toaster.success("Door created successfully")
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));
        //  this._router.navigate(['/sitedashboard'])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )
   // var obj=this.doorentity;

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

  shareSiteToDevice(siteid)
  {
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("the site id is ",siteid);

    this._service.shareSite(this.data.custID,siteid).subscribe(
      data => {
       if(data!=null)
       {
        // this.engineerSitearray=data;
         console.log("the respose is ",data)
         this.toaster.success(data)
        // localStorage.setItem("acesscontroldata", JSON.stringify(data));
        //  this._router.navigate(['/sitedashboard'])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )

  }

  poweronreset(siteid)
  {
    this._router.navigate(['/poweronreset',siteid])


  }
  lockdown(siteid)
  {
    this._router.navigate(['/lockdown',siteid])

  }
  lossofcan(siteid)
  {
    this._router.navigate(['/lossofcan',siteid])

  }
  fireinput(siteid)
  {
    this._router.navigate(['/fireinput',siteid])

  }
  closewindow()
{
  window.location.reload()

}
}
