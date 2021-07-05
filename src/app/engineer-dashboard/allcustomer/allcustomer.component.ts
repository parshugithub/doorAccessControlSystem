import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerProfile } from 'src/app/modal/customer-profile';
import { Door } from 'src/app/modal/door';
import { EngineerSite } from 'src/app/modal/engineersite';
import { EngineerTotalDoors } from 'src/app/modal/engineertotaldoor';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-allcustomer',
  templateUrl: './allcustomer.component.html',
  styleUrls: ['./allcustomer.component.scss']
})
export class AllcustomerComponent implements OnInit {
  confirmation:boolean = true;

  data:any;
  engineerSite=new EngineerSite();
  engineerSitearray:EngineerSite[];
  doorentity = new EngineerTotalDoors()
  customerProfile: CustomerProfile[];
  customer= new  CustomerProfile();
  doorentityarray =new Array(128);
  engineerName : string;
  closeResult: string;
  totalDoors: Door[];
  siteid:any;
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
  constructor(private modalService: NgbModal,private route: ActivatedRoute,
    public ngbModalService: NgbActiveModal,private moveToSite: MoveToSiteService,public datepipe: DatePipe,
     public _service: RegistrationService, public _router: Router, private toaster: ToastrService) { }

  ngOnInit(): void 
  {
  this.getAllCustomersAdmin();
this.gettingAllCustomers();
    this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      // console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      // console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })

   
  

  }
getAllCustomersAdmin(){
  this._service.getAllCustomersForAdmin().subscribe(
    data =>   {
     if(data!=null)
     {
      this.customerProfile=data;
       console.log("the respose is ",data)
     
     }

    },
    error => {
      console.log("this is error credentials", error)
      // this.msg = "Check the Credentails or varify the account"
      // this.toaster.error(this.msg);


    }
  )
}

addCustomer(){
  let engID = this.route.snapshot.params['engID'];
  this._router.navigate(['/createcustomer',engID])

}
  gettingAllCustomers(){
    // this.data = JSON.parse(localStorage.getItem("acesscontroldata"));
    // console.log("this is for engineerswd",this.data);
    let engID = this.route.snapshot.params['engID'];
   console.log("this is for engineerswd",engID);

    this._service.getAllCustomers(engID).subscribe(
      data =>   {
       if(data!=null)
       {
        this.customerProfile=data;
         console.log("the respose is ",data)
       
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )
  }


  update(siteid)
  {

  }
  delete(siteid)
  {
    
  }
  getSiteId(siteid)
  {
 this.siteid=siteid

    console.log('the site id is ',siteid)

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
         this._router.navigate(['/sitedashboard'])
         
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
         this._router.navigate(['/sitedashboard'])
         
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )

  }

  poweronreset(custID)
  {
    this._service.getCustomers(custID).subscribe(
      data => {
       if(data!=null)
       {
        this.customer=data;
        this.engineerName =  JSON.parse(localStorage.getItem("acesscontroldata")).engineerName;
        localStorage.clear();
        this.customer.engineerName = this.engineerName;
        localStorage.setItem("acesscontroldata", JSON.stringify(this.customer));
         console.log("the respose is ",data);
         console.log("sdfewfewf",custID)
         this._router.navigate(['/sitedashboard',custID])
       
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )
  }
  lockdown(custID)
  {
    console.log("this is the customer id",custID)
    this._service.getCustomers(custID).subscribe(
      data => {
       if(data!=null)
       {
        this.customer=data;
        localStorage.clear();
        localStorage.setItem("acesscontroldata", JSON.stringify(this.customer));
         console.log("the respose is ",data)
         console.log("this iewfdewqf",data.custID);
        //  let custID=data.custID;
         this._router.navigate(['/addsite',custID])
       
       }
  
      },
      error => {
        console.log("this is error credentials", error)
        // this.msg = "Check the Credentails or varify the account"
        // this.toaster.error(this.msg);
  
  
      }
    )
    

  }
  lossofcan(siteid)
  {
    this._router.navigate(['/lossofcan',siteid])

  }
  fireinput(siteid)
  {
    this._router.navigate(['/fireinput',siteid])

  }

  updateCustomer(custID){

    console.log("this is for customer id",custID)
    this._router.navigate(['/edit-customer',custID]);
  
  }
 
deleteCustomerCalling(custID){
  this.confirmation=confirm("Are you sure to delete -" +custID)
  
  if(this.confirmation==true)
  {
  console.log(custID)
  this._service.deleteCustomer(custID)
  .subscribe((res)=>{
  this.gettingAllCustomers();
  
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
