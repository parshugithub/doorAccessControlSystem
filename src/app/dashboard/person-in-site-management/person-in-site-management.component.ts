


import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/modal/person';
import { PersonClass } from 'src/app/modal/person-class';
import { PersonGroup } from 'src/app/modal/person-group';
import { Site } from 'src/app/modal/sitemodal';
import { PersonClassService } from 'src/app/service/person-class.service';
import { PersonGroupService } from 'src/app/service/person-group.service';
import { PersonInSiteService } from 'src/app/service/person-in-site.service';
import { PersonService } from 'src/app/service/person.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-person-in-site-management',
  templateUrl: './person-in-site-management.component.html',
  styleUrls: ['./person-in-site-management.component.scss']
})
export class PersonInSiteManagementComponent implements OnInit {
  siteList: Site[] = [];
  editProfileForm: FormGroup;
  updatePersonclassId:any;
  updatePersongroupId:any;
  siteSelect:any;
  singleSiteId:any;
  editSiteSelect:any;
expiryPersonClassDate:any;
createPersonClassDate:any;
createPersonGroupDate:any;
personclassname:any;

  site = new Site();
  personClasses: PersonClass[] = [];
  personclassobj = new PersonClass();
  persongroupobj = new PersonGroup();

  personclassFinalUpdate=new PersonClass();
  persongroupFinalUpdate = new PersonGroup();

  personGroups: PersonGroup[] = [];
  accessingClassname:any;
  accessingGroupname:any;
  date: Date;
  personClassDate:any
  personGroupDate:any
  numberOfPersons: number[] = new Array(8)
  totalPersons: number[] = new Array(8)
  totalPersonGroup: number[] = new Array()

  singleperson:any;
  count=1;
  siteid:number;
  personClassList:any;
  personGroupList:any;
  closeResult: string;

  id: number;
 selectionModel;
 selectionGroupModel;
 
 personClass = new PersonClass();
 personClassUpdate:any = [];
 personGroupUpdate:any = [];

 personGroup = new PersonGroup();
 personClassExpiry:any
 personGroupExpiry:any


 personClassName = "";
 personGroupName = "";
 persongroupid="";
 personclassid="";
 personClassSingle="";
 selectedPersons: any = [];
 selectedPersonsGroup: any = [];
  className;
  searchText;
  persons: Person[] = [];
  personsArray:any=[];
person = new Person();
personid:number;
  personList:any;
  jstoday = '';
  jstoday1 = '';
  today = new Date();
  msg= '';
  constructor(public userService: UserService,private personInService:PersonInSiteService,private route: ActivatedRoute,public siteManagementservice:SitemanagementService,public datepipe: DatePipe,private fb: FormBuilder,private modalService: NgbModal,public ngbModalService: NgbActiveModal,private router:Router,private personService:PersonService,private personClassService:PersonClassService,private personGroupService:PersonGroupService,private toaster:ToastrService) { }

  ngOnInit(): void {
this.allSites();

    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
     });
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.person = new Person();
    this.personid = this.route.snapshot.params['personid'];
console.log("this is person id",this.personid);
    this.site = new Site();
    this.siteid = this.route.snapshot.params['siteid'];
console.log("this is site id",this.siteid);  
this.gettingAllPersonClassesInSite();
this.gettingAllPersonGroups();
this.gettingAllPersons();
// this.gettingAllPersonsForSite();
console.log("just checking for specific personclass",)


  }


  allSites(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  
    this.siteManagementservice.getAll(data.id).subscribe((siteListResponse: Site[])=>{
      console.log(siteListResponse);
      this.siteList = siteListResponse;
      var totalength=siteListResponse.length;
      console.log(totalength);
        }) 
  }
  
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openPersonGroup(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  gettingAllPersonClassesInSite(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.personInService.getAllPersonClassInSite(data.id).subscribe((data: PersonClass[])=>{
      console.log("we are using person class list",data);
      this.personClasses = data;
      var totalength=data.length;
    console.log("we are using personclasses array list",this.personClasses);

    for(this.personClassList=1;this.personClassList<=totalength;this.personClassList++){
    this.count++;
    }
    console.log(this.count);
    
    })
  }



  gettingSinglePersonClass(personclassid){
    console.log("this is for person class id",personclassid)
this.personInService.getOnlySinglePersonClassInSite(personclassid)
  .subscribe(data => {
    console.log("getting personclass", data)
    this.personClassUpdate=data;
    this.personClass= this.personClassUpdate;
    console.log("this is the single person class", this.personClassUpdate.siteid);
    let siteId=this.personClassUpdate.siteid;
    console.log("this is for edit site",siteId)
  this.personClass.expirydate = new Date((this.personClass.expirydate.toString())).toISOString().substr(0, 16);
  }, error => console.log(error));
  console.log("this is ggget",personclassid)
  this.updatePersonclassId=personclassid
 
 }


 gettingSinglePersonGroup(pgroupid){
   console.log("thius is for person group",pgroupid)
  this.personInService.getOnlySinglePersonGroupInSite(pgroupid)
    .subscribe(data => {
      console.log("getting persongroup", data)
      this.personGroupUpdate=data;
      this.persongroupobj=this.personGroupUpdate;
      console.log("this is the single person group", this.personGroupUpdate)
  this.persongroupobj.expirydate = new Date((this.persongroupobj.expirydate)).toISOString().substr(0, 16);

    }, error => console.log(error));
    console.log("this is ggget",pgroupid)
    this.updatePersongroupId=pgroupid
  
   }
  
   
 

   getPersonClassInEditToMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.editSiteSelect=dataList;
      console.log("getting site", this.editSiteSelect.siteid);
    }, error => console.log(error));
  


  }



 updatedPersonClass()
   {


    console.log("getting ewfewfwfew", this.personClassUpdate.siteid);

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let x = (<HTMLInputElement>document.getElementById("personclass_expiryDate")).value;
    this.jstoday = x;
    this.jstoday = formatDate(x, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    let x1 = (<HTMLInputElement>document.getElementById("personclass_name")).value;
    console.log("date is", this.jstoday);
    console.log("this is ffgfwr",this.personClassUpdate)
this.personclassFinalUpdate.expirydate=this.jstoday;
this.personclassFinalUpdate.personClassName=x1;
this.personclassFinalUpdate.webAppPersonClassid=data.id;
this.personclassFinalUpdate.siteid=this.siteid;
this.date=new Date();
    this.createPersonClassDate =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.personclassFinalUpdate.createddate=this.createPersonClassDate;
      console.log("sdbcdhbcdcdbcdb",this.personclassFinalUpdate)
    this.personInService.updatePersonClassInSite(this.updatePersonclassId,this.personclassFinalUpdate).subscribe(
      (res) => {
        console.log("dcdbcdbcdcdcd")
        console.log(res);
        this.msg="successfully updated";
        this.toaster.success(this.msg);
        this.gettingAllPersonClassesInSite();
      },
      error => {
        this.toaster.error(error);

      }
    )
   }
   getPersonGroupInEditToMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.editSiteSelect=dataList;
      console.log("getting site", this.editSiteSelect.siteid);
    }, error => console.log(error));
  


  }



   updatedPersonGroup()
   {
    console.log("ewfewfe site", this.editSiteSelect.siteid);

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let x = (<HTMLInputElement>document.getElementById("persongroup_expiryDate")).value;
    this.jstoday = x;
    this.jstoday = formatDate(x, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    let x1 = (<HTMLInputElement>document.getElementById("persongroup_name")).value;
    console.log("date is", this.jstoday);
    console.log("this is ffgfwr",this.personGroupUpdate)
this.persongroupFinalUpdate.expirydate=this.jstoday;
this.persongroupFinalUpdate.personGroupName=x1;
this.persongroupFinalUpdate.webappPerosnId=data.id;
this.persongroupFinalUpdate.siteid=this.siteid;
this.date=new Date();
    this.createPersonGroupDate =this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
    this.persongroupFinalUpdate.createddate=this.createPersonGroupDate;
      console.log("sdbcdhbcdcdbcdb",this.persongroupFinalUpdate)
    this.personInService.updatePersonGroup(this.updatePersongroupId,this.persongroupFinalUpdate).subscribe(
      (res) => {
        console.log("dcdbcdbcdcdcd")
        console.log(res);
        this.msg="successfully updated";
        this.toaster.success(this.msg);
        this.gettingAllPersonGroups();
      },
      error => {
        this.toaster.error(error);

      }
    )
   }





  
  remove_person_class_modal(personclassid){
    console.log("this is deleting class purpose",personclassid)
    this.personInService.deletepersonClassInSite(personclassid)
      .subscribe((res)=>{
        console.log("this is the response",res);
        this.toaster.success(res);
        this.gettingAllPersonClassesInSite()  
      },
       (err) => {
        console.log(err);
      }
      
      ); 

  }
  


  gettingAllPersonGroups(){

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));


    this.personInService.getAllPersongroupInSite(data.id).subscribe((personGroupListResponse: PersonGroup[])=>{
      console.log("we are using person group list",personGroupListResponse);
      this.personGroups = personGroupListResponse;
      var totalength=personGroupListResponse.length;
    console.log("we are using persongroups array list",this.personGroups);

    for(this.personGroupList=1;this.personGroupList<=totalength;this.personGroupList++){
    this.count++;
    }
    console.log(this.count);
    
    })
  }






  remove_person_group_modal(pgroupid){
    console.log("this is deleting purpose",pgroupid)
    this.personInService.deletePersonGroupInSite(pgroupid)
      .subscribe((res)=>{
        console.log("this is the response",res);
        this.toaster.success(res);
        this.gettingAllPersonGroups()  
      },
       (err) => {
        console.log(err);
      }
      
      ); 
  }
  






  getPerson() {
    for (let i = 0; i < this.numberOfPersons.length; i++) {
      this.numberOfPersons[i] = i;
    }
  }

gettingPerson(){
  
  for (let i = 0; i < this.totalPersons.length; i++) {
    this.totalPersons[i] = i;
  }

}

gettingPersoningGroup(){
  
  for (let i = 0; i < this.totalPersonGroup.length; i++) {
    this.totalPersonGroup[i] = i;
  }

}
gett(){
  for (let i = 0; i < this.totalPersonGroup.length; i++) {
    this.totalPersonGroup[i] = i;
  }
}



  onChangePerson(person) {
    console.log("The staff ", person)


  }
 

    getPersonToGroupMap(val,i){
      console.log("this i qwedqwdqwd wedqw",val)
      var personroll=(<HTMLInputElement>document.getElementById("person_group_members" + i)).value;
      this.personService.getPerson(personroll).subscribe((data: Person[]) => {
        console.log("selected person ",data);
        this.singleperson = data;
        this.selectedPersonsGroup.push(this.singleperson)
      })
  
      console.log("staff is ", personroll)
      }



    

gettingAllPersons(){
  let data = JSON.parse(localStorage.getItem("acesscontroldata"));
  console.log("this is hdcvbsdhcvdch custid",data.id);
console.log("tjisbhcdychyc site it",this.siteid)
localStorage.setItem("siteid", JSON.stringify(this.siteid));

  this.personInService.gettingAllPesonsInSite(data.id).subscribe((personListResponse: Person[])=>{
    console.log("this is the persons list respomnse",personListResponse);
    this.persons = personListResponse;
  
    var totalength=personListResponse.length;
  console.log(totalength)
  for(this.personList=1;this.personList<=totalength;this.personList++){
    
  this.count++;
  }
  
  

  // for (let i = 0; i < this.persons.length; i++) {
  //   const element = this.persons[i];
  //   console.log("personforloop", element.personclassone)
     
  //   console.log("personclass id",element.personclassone.pclassid);

  //   this.personClassService.getPersonClass(element.personclassone.pclassid)
  //   .subscribe(data => {
  //     this.personclassname=data.personClassName;
  //    console.log("personclass",this.personclassname);

  //   }, error => console.log(error));
  //   console.log(this.personclassid)
    
  // }


  console.log(this.count);
  
  })
}

deletePersonCalling(personid){
  console.log("this is deleting purpose",personid)
    this.personInService.deleteInSitePerson(personid)
      .subscribe((res)=>{
        console.log("this is the response",res);
        this.toaster.success(res);
        this.gettingAllPersons();

      },
       (err) => {
        console.log(err);
      }
      
      );
  }


  update(personid){
    console.log("is it correct the person id",personid)
    this.router.navigate(['person-management/edit-person',personid])
  }
  

  goToSitePersonCreate(){
    console.log("this is the person create",this.siteid)
    this.router.navigate(['dashboard/persons/create',this.siteid]);

  }

  goToSitePersonUpadte(){
    console.log("this is the person update",this.siteid)

    this.router.navigate(['dashboard/persons/upadate',this.siteid]);

  }
  g

  goToSite(){
    this.router.navigate(['dashboard']);

  }

  goToSitePersonGroup(siteid){
    this.router.navigate(['persons/personGroup',this.siteid]);

  }

  goToSitePersonClass(siteid){
    this.router.navigate(['persons/personClass',this.siteid]);

  }
  

   createpersonclass()
   {
     let siteId=this.siteSelect.siteid;
    console.log("dwdqdwddw",siteId);

     let dataval = JSON.parse(localStorage.getItem("acesscontroldata"));
     let id1 = dataval.id;
     let Perdonclassval = new PersonClass();
     let DateValue = (<HTMLInputElement>document.getElementById("expiredate")).value;
     console.log("the date is ",DateValue)
     this.jstoday = DateValue;
     this.jstoday = formatDate(DateValue, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
     this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
     console.log("date is", this.jstoday);
     console.log("before ", DateValue)
 
 
     this.personclassobj.expirydate = this.jstoday;
 
     console.log("rrt", this.personclassobj.expirydate)
 
     this.personclassobj.createddate = this.jstoday1;
      this.personInService.createPersonClassInSite( dataval.id,siteId,this.personclassobj).subscribe(
       (res) => {
        this.msg="person class created successfully";
        this.toaster.success(this.msg);
        this.gettingAllPersonClassesInSite();
         this.ngbModalService.close();
       },
       error => {
         console.log("error exception");
         this.msg = error.error;
        })
 
   }



   getPersonToSearchMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.singleSiteId=dataList;
      console.log("getting site", this.singleSiteId.siteid);
// let siteId=this.siteSelect.siteid;
let data = JSON.parse(localStorage.getItem("acesscontroldata"));
this.personInService.getAll(data.id, this.singleSiteId.siteid).subscribe((personListResponse: Person[])=>{
  console.log("this is the persons list respomnse",personListResponse);
  this.persons = personListResponse;   
})
      // this.siteSelect=data;
    }, error => console.log(error));


  }

  getPersonClassToSearchMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.singleSiteId=dataList;
      console.log("getting site", this.singleSiteId.siteid);
let data = JSON.parse(localStorage.getItem("acesscontroldata"));
this.personInService.getPersonClassForSite(data.id, this.singleSiteId.siteid).subscribe((personClassListResponse: PersonClass[])=>{
  console.log("this is the persons list respomnse",personClassListResponse);
  this.personClasses = personClassListResponse;   
})
    }, error => console.log(error));


  }
  getPersonGroupToSearchMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.singleSiteId=dataList;
      console.log("getting site", this.singleSiteId.siteid);
let data = JSON.parse(localStorage.getItem("acesscontroldata"));
this.personInService.getPersonGroupForSite(data.id, this.singleSiteId.siteid).subscribe((personGroupListResponse: PersonGroup[])=>{
  console.log("this is the persons list respomnse",personGroupListResponse);
  this.personGroups = personGroupListResponse;   
})
    }, error => console.log(error));


  }




   getPersonToMap(val) {
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.siteSelect=dataList;
      console.log("getting site", this.siteSelect.siteid);
// let siteId=this.siteSelect.siteid;
 
      // this.siteSelect=data;
    }, error => console.log(error));
  


  }
  getPersonGroupToSiteMap(val){
    console.log("this i qwedqwdqwd wedqw", val);
    let sitename=val;
    this.siteManagementservice.getSite(sitename)
    .subscribe(dataList => {
      this.siteSelect=dataList;
    }, error => console.log(error));
  
   }


   createpersongroup(){
    console.log("getting site", this.siteSelect.siteid);
let siteId=this.siteSelect.siteid;
    let dataval = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log("this djcbdccd",dataval)
    let id1 = dataval.id;
    let Perdonclassval = new PersonClass();
    let DateValue = (<HTMLInputElement>document.getElementById("expiregroupdate")).value;
    console.log("the date is ",DateValue)
    this.jstoday = DateValue;
    this.jstoday = formatDate(DateValue, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    console.log("date is", this.jstoday);
    console.log("before ", DateValue)


    this.persongroupobj.expirydate = this.jstoday;

    console.log("rrt", this.persongroupobj.expirydate)

    this.persongroupobj.createddate = this.jstoday1;
     this.personInService.createPersonGroupInSite( dataval.id,siteId,this.persongroupobj).subscribe(
      (res) => {
        console.log("the response is ",res);
        this.msg="person group created successfully";
        this.toaster.success(this.msg);

        this.gettingAllPersonGroups();
        this.ngbModalService.close();
      },
      error => {
        console.log("error exception");
        this.msg = error.error;
       })




   }


  

}
