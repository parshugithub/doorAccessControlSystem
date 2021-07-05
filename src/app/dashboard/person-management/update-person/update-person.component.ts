import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Door } from 'src/app/modal/door';
import { DoorGroup } from 'src/app/modal/door-group';
import { Person } from 'src/app/modal/person';
import { PersonGroup } from 'src/app/modal/person-group';
import { ProgramToSite } from 'src/app/modal/program-to-site';
import { ScheduleMain } from 'src/app/modal/schedule-main';
import { Site } from 'src/app/modal/sitemodal';
import { Staff } from 'src/app/modal/staff';
import { StaffGroup } from 'src/app/modal/staff-group';
import { StaffGroupTags } from 'src/app/modal/staffgrouptags';
import { DoorGroupService } from 'src/app/service/door-group.service';
import { MoveToSiteService } from 'src/app/service/move-to-site.service';
import { PersonService } from 'src/app/service/person.service';
import { ProgramToSiteService } from 'src/app/service/program-to-site.service';
import { RegistrationService } from 'src/app/service/registration.service';
import { SitemanagementService } from 'src/app/service/sitemanagement.service';
import { StaffService } from 'src/app/service/staff.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {

  editProfileForm: FormGroup;
  show = 8;
  tagsReference: any = [];
  personGroupReference:any;

  staffList: any;
  val: number;
  taglist: number = 0;
  count = 1;
  singledoor: any;
  selectedpersongroups=[];
  selectedDoorGroups:any=[];
  selectedPersonGroups:any=[];
  
  flag: boolean = true;
  colorvalue: any;
  singlestaff: any;
  tagsAll: any;
  selectedTags: any = [];
  selectedDoorGroup=[];
  selectedTagslist: any = [];
  selectedDoors: any = [];
  selectedStaffs: any = [];
  selectedSites: any = [];
  programToSites: any = [];
  selectedSchedule :any =[];
  selectedScheduleObj :any =[];
  programToSiteStaffs: any = [];
  date: Date;
  staffGroupcreatedeDate: any;
  tagnumber: any;
  tagvalue: any;
  clickValue: number;
  siteid: any;
  personid: any;
  increaseShow() {
    this.show += 8;
    console.log(this.show)
  }
  public showRate;
  public selectionModel;
  doorgroupidreference:any;
  personGroupIdRefrence:any;
  staffGroupName = "";
  groupid: number;
  programstaffId: any;
  staffGroup = new StaffGroup();
  programToSite = new ProgramToSite();
  updateAllInformationPerson=new Person();
  personarray: Person[];
  personUpdate =new Person();
  personresponse :any;
  personUpdateWithAll = new Person();

  staffTags: StaffGroupTags[] = [];
  groupName;
  decryptpersonGroup:PersonGroup[];
  staffgroupid: any
  site: Site[] = [];
  doorGroups: DoorGroup[] = [];
doorGroupObj=new DoorGroup();
  msg = '';
  closeResult: string;
  persongroup: PersonGroup[] = [];
  staffsSchedule: ScheduleMain[] = [];
  staffsScheduleid: ScheduleMain[]
  satffgroupvales: any = {};
  staffvalues: any = [];
persongroupObj = new PersonGroup();
  scheduleMain = new ScheduleMain();
  staffgroupTag = new StaffGroupTags();
  start = new Date(Date.now());
  currentDate = new Date();
  today = new Date();
  jstoday = '';
  jstoday1 = '';
  scheduleid :any;
  lastUpdated: string;
  totalDoors: any;
  doors: Door[] = [];
  accessingDoorNumber: any;
  allSites: any = [];
  allStaff: any = [];
  selectedScheduleIds = [];
  selectedFinalScheduleIds=[];

  constructor(public StaffManagementservice: StaffService,public userService: UserService, private router: Router,private doorGroupService:DoorGroupService,
    public staffservice: StaffService, private route: ActivatedRoute, private programToSiteService: ProgramToSiteService, private moveToSite: MoveToSiteService,
    public _service: RegistrationService, 
    private modalService: NgbModal, public datepipe: DatePipe,
    private toaster: ToastrService, private personservice: PersonService, private siteManagementservice: SitemanagementService,
    public ngbModalService: NgbActiveModal, public siteService: SitemanagementService,private fb: FormBuilder) {

  }
  customerResponce;
  response;
  data = JSON.parse(localStorage.getItem("acesscontroldata"));
  numberOfPersonGroups: number[] = new Array(8)

  ngOnInit(): void {

    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
     });
     this.siteid = this.route.snapshot.params['siteid'];

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log(data);
    console.log("The customer response ", data)
    console.log("The id is", data.id)
    this.personservice.getAllPersonGroups(data.id).subscribe((response: PersonGroup[]) => {
      console.log("the staff group ", response)
      this.staffvalues = response;
      console.log("response staff group", this.satffgroupvales)
      console.log("the group", this.staffvalues);
      console.log("the res", response);
      this.persongroup = response;
      console.log("the staff id is ",this.persongroup)
      var totalength = response.length;
      console.log(totalength)
      for (this.staffList = 1; this.staffList <= totalength; this.staffList++) {
        this.count++;
      }
      console.log(this.count);



      console.log("the staff", this.persongroup);
    })

    this.StaffManagementservice.getSchedueles(data.id).subscribe((response: ScheduleMain[]) => {
      console.log("the staff group ", response)

      this.staffsSchedule = response;
      


      console.log("the staff", this.persongroup);
    })

    this.siteManagementservice.getAll(data.id).subscribe((data: Site[]) => {
      console.log(data);
      this.site = data;
    })
    this.getStaffs();
    this.gettingAllPersons();
     this.gettingAllDoorGroups();
    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })

   

  }
  open(content) {
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
  getStaff() {
    for (let i = 0; i < this.numberOfPersonGroups.length; i++) {
      this.numberOfPersonGroups[i] = i;
    }
  }
  onChangeStaff(stafff) {
    console.log("The staff ", stafff)


  }

  gettingAllPersons() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.personservice.getAll(this.siteid,data.id).subscribe((data: Person[]) => {
      console.log(data);
      this.personarray = data;
      console.log("all persons are", this.personarray);
    })
  }
  gettingAllDoorGroups(){
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.siteid = this.route.snapshot.params['siteid'];
    this.doorGroupService.getAll(this.siteid,data.id).subscribe((res: DoorGroup[])=>{
      console.log("we are using door group list",res);
      this.doorGroups = res;
      console.log("this is for doorgroup responce",this.doorGroups)

  
    })

  }

  checkedDoorGroup(doorGroup) {
    if (this.selectedDoorGroup.indexOf(doorGroup) != -1) {
      // console.log("jbwefwefwfwefhvbdfvdf",this.selected)

      return true;
    }
  }

  // onChange(checked, doors) {
  //   if (checked) {
  //     console.log("jbhvbdfvdf",doors)

    
  //     this.selected.push(doors);

  //     console.log("jbhvbdffffvdf",this.selected)


  //    } 
     
  //    else {
  //     this.selected.splice(this.selected.indexOf(doors), 1);
  //     console.log("webwefbweffwe",this.selected)
  //   }
  // }



  getDoorGroup(checked, doorGroup,i){
    if (checked) {
   
    this.doorGroupService.getOnlySingleDoorGroup(doorGroup)
      .subscribe(doorGroupRespose => {
        console.log("getting doorGroup", doorGroupRespose);
        this.doorgroupidreference=doorGroupRespose;
        this.selectedDoorGroup.push(this.doorgroupidreference);
       // this.updateSingleDoorGroup(data) 
      }, error => console.log(error));


console.log("dcbdhcbdhcdbc",checked);
console.log("dcbdhcdcjcwecbdhcdbc", this.doorgroupidreference);
// this.doorGroupObj.doorgroupid=this.doorgroupidreference;
    // this.selected.push(this.doorgroupidreference);

// console.log("this is for door group object",this.doorGroupObj)
      

  }
  else {
    this.selectedDoorGroup.splice(this.selectedDoorGroup.indexOf(doorGroup), 1);
    console.log("webwefbweffwe",this.selectedDoorGroup)
  }
  }

  // getSitesForStaffGroup(i) {
  //   console.log("The event ", event);
  //   var siteName = (<HTMLInputElement>document.getElementById("site" + i)).textContent
  //   console.log("The site ", siteName);
  //   this.siteService.getSite(siteName)
  //     .subscribe(data => {
  //       console.log("getting site for reference", data)
  //       this.selectedSites.push(data)
  //     }, error => console.log(error));
  //   console.log(this.site)
  // }

  checked(scheduleId) {
    if (this.selectedScheduleIds.indexOf(scheduleId) != -1) {
      return true;
    }
  }


  getScheduleForStaff(j,scheduleidval,checked)
  {
    if(checked){
  
    console.log("the selcted schedule are ",j);
    console.log("the selcted schedule are ",scheduleidval);
   // this.scheduleid=scheduleidval;
    this.scheduleMain.scheduleId=scheduleidval;

    const staffScheduleId = Object.assign({}, this.scheduleMain);

    console.log("this is forselectededfedfe ", staffScheduleId)

    var checkedScheduleId=this.selectedScheduleIds.includes(staffScheduleId);
  if(!checkedScheduleId){
    this.selectedScheduleIds.push(staffScheduleId);
    console.log("this is forselected ",  this.selectedScheduleIds)

  }

  }else {
    this.selectedScheduleIds.splice(this.selectedScheduleIds.indexOf(scheduleidval), 1);
    }

  }


  allselectedSchedules(){
    this.msg='Successfully  selected schedules';
       this.toaster.success(this.msg);
   

  }

  changeColor(door, k) {
    if (this.flag == true) {
      console.log("if flag 1 ", this.flag)
      this.flag = false;
      console.log(" if called");
      this.colorvalue = (<HTMLInputElement>document.getElementById("door" + k)).style.backgroundColor = "lightgreen";
      console.log("if flag 2", this.flag)
      this.flag = false;


    }
    else {
      console.log("else flag 1", this.flag)
      this.flag = true;
      console.log(" another if called");
      this.colorvalue = (<HTMLInputElement>document.getElementById("door" + k)).style.backgroundColor = "#fff";
      this.flag = true;
      console.log("else flag 2", this.flag)

    }
    if (this.colorvalue == 'lightgreen') {
      this.selectDoorForPerson(door)
    }

  }





  selectDoorForPerson(door) {
    console.log("selected door ", door);
    this.moveToSite.getSingleDoor(door).subscribe((Response: Door) => {
      console.log("the door response ", Response)
      this.singledoor = Response;
      this.selectedDoors.push(this.singledoor)
      console.log("The doorid issssss ", this.singledoor.doorId)
      console.log("main doors are", this.selectedDoors)
    })
  }

  checkTag($event: KeyboardEvent) {

 this.taglist;
console.log("the click value ",this.taglist);
    let elementId: string = (event.target as Element).id;
    var tag;

    var tagnumber = (<HTMLInputElement>event.target).value;

    if (tagnumber.length == 8) {
      
        this.taglist++;
      
      this.staffTags = this.selectedTags;
      console.log("the list value is after", this.taglist);
    }

    console.log("the list value is before", this.taglist);
    // console.log("the id is ",id)




  }
  getPersongroupToMap(val, i) {
    console.log("this i qwedqwdqwd wedqw", val)
    var persongroupid = (<HTMLInputElement>document.getElementById("persongroup" + i)).value;
    console.log("erfygeryfgbfer", persongroupid);
    this.personservice.getOnlySinglePersonGroup(persongroupid)
    .subscribe((Response:PersonGroup[])=> {
      console.log("getting persongroup", Response);
        this.personGroupReference=Response;
        this.selectedPersonGroups.push(this.personGroupReference)

       console.log("the response length is" ,this.selectedPersonGroups.length)
     
    }, error => console.log(error));
    // console.log("this is ggget",persongroupid)
   console.log("this is the single person group", this.selectedPersonGroups)

    // this.decryptpersonGroup = this.selectedPersonGroups.map(({ doorId,...item }) => item);
    // this.decryptpersonGroup=this.selectedPersonGroups.persongroupid;
    // console.log("dcusdbchdbcsdhcbsd",this.decryptpersonGroup)

    // this.updatePersongroupId=persongroupid
  }

  onChangeperson(value) {
    console.log("this is getting value", value);
    this.personid = value;
    console.log("this is groupid", this.personid);

    this.personservice.getPerson(this.personid).subscribe(personresponse => {
      this.selectedPersonGroups.length = 0;
      this.selectedDoorGroup.length = 0;
      this.selectedDoors.length = 0;
     // this.selectedSites.length = 0;

      // for (let i = 1; i < 8; i++) {
      //   console.log("empty calling");
      //   (<HTMLInputElement>document.getElementById("tag_" + i)).value = "0";
      // }
      for (let i = 0; i < this.numberOfPersonGroups.length; i++) {
        console.log("staff calling");
        $("#persongroup" + i).attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
      }
      // for (let j = 0; j < this.doorGroups.length; j++) {
      //   console.log("site calling");
      //   (<HTMLInputElement>document.getElementById("doorgroupval" +(j + 1))).checked = false;
      // }

      for (let i = 0; i < this.totalDoors.length; i++) {
        console.log("door calling");

        // (<HTMLInputElement>document.getElementById("door"+i)).value = " ";
        (<HTMLInputElement>document.getElementById("door" + i)).style.backgroundColor = "#fff"
      }

    console.log("getting person", personresponse);
   this.personresponse=personresponse;
   this.personUpdateWithAll=this.personresponse;
   console.log("the complete respose is ",this.personUpdateWithAll);

   for (let i = 0; i < this.personUpdateWithAll.persongroup.length; i++) {
    console.log("staff id is ", this.personUpdateWithAll.persongroup[i].persongroupid)
    this.val = this.personUpdateWithAll.persongroup[i].persongroupid;
    console.log("asjhdkajs", this.val);
    //var x=  $("#staff_members"+j+"option[value=2]").attr('selected', 'selected');
    $("#persongroup" + i + " option[value=" + this.val + "]").attr('selected', 'selected');
    console.log("res");
    this.selectedStaffs.push(this.personUpdateWithAll.persongroup[i]);
    //  (<HTMLInputElement>document.getElementById("staff_members"+i)).value(data.staffManyToMany[i].staffid).attr('selected', 'selected');

  }
  for (let i = 0; i < this.personUpdateWithAll.doors.length; i++) {
    console.log("the doors respose is", this.personUpdateWithAll.doors[i].doorName);
    var num = this.personUpdateWithAll.doors[i].doorName;
    console.log("The door is ", num)
    var n = num.toString();
    let door = this.personUpdateWithAll.doors[i].doorName;
    (<HTMLInputElement>document.getElementById("door" + (num - 1))).value = n;
    (<HTMLInputElement>document.getElementById("door" + (num - 1))).style.backgroundColor = 'lightgreen'
    this.selectDoorForPerson(num)
    this.flag = false;

  }

  for (let i = 0; i < this.personUpdateWithAll.doorGroup.length; i++) {
    var doorgroupidval = this.personUpdateWithAll.doorGroup[i].doorgroupid;
   var checkedval= (<HTMLInputElement>document.getElementById("doorgroupval" + doorgroupidval)).checked = true;
    console.log("the selected sites are ", this.personUpdateWithAll.doorGroup[i])
    this.getDoorGroup(checkedval,doorgroupidval,i);
    this.programToSites = this.personUpdateWithAll.doorGroup[i]

  }

  }, error => console.log(error));
    
  }
  showDropdown(dropdown) {
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);

  }
  

  remove_staff_group_modal() {
    console.log("for deleting purpose only", this.groupid)
    this.personservice.deletePerson(this.groupid)
      .subscribe((res) => {
        console.log(res);
        this.toaster.success(res);
        window.location.reload();

        // this.gettingAllStaffGroup();
      });


  }



  getStaffs() {
    this.persongroup = null; //or create new contrats object

    this.StaffManagementservice.getAll(this.data.id).subscribe((data: Staff[]) => {
      console.log(data);
      //this.persongroup = data;
    })
  }

 
  goBack() {
    this.router.navigate(['/staffmanagement'])
  }
  update(staffid) {
    console.log(staffid);
    this.router.navigate(['staffmanagement/editstaff', staffid]);
    console.log("done")

  }


  deleteStaffCalling(staffid) {
    if (confirm("Are you sure to delete " + staffid)) {
      this.router.navigate(['/staffmanagement'])

      console.log("Implement delete functionality here");
      this.staffservice.deleteStaff(staffid)
        .subscribe(() => {
          //this.reloadComponent();
          // this.refreshPage();
          // console.log(res);
          this.getStaffs();
          // console.log(this.getStaffs())

          //     if (res.status == 'success') {
          //   this.router.navigate(['/staffmanagement'])
          //   this.toaster.success(res.message);

          // }

        });
    } else {
      console.log("you are not allowing delete")
    }
  }
  // refreshPage() {
  //   window.location.reload();
  //  }
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/staffmanagement']);
  }


  onSubmit() {
    this.update_personWithallInformation();
  }


  update_personWithallInformation() {
   // this.personUpdateWithAll;
    this.personUpdateWithAll.persongroup=this.selectedPersonGroups;
    this.personUpdateWithAll.doorGroup=this.selectedDoorGroup;
    this.personUpdateWithAll.doors=this.selectedDoors;

    console.log("total Object is ",this.personUpdateWithAll)

  //  console.log("wdcvsgcvdcgscvs",  this.selectedDoorGroup);
  

   // console.log("this is final update staffgroup", this.personUpdateWithAll);
    this.personservice.updatePersonWithAll(this.personid, this.personUpdateWithAll,this.data.id,this.siteid).subscribe(
      (res) => {
        console.log("The updated code is ",res);
        this.msg="person all information updated successfully"
                this.toaster.success( this.msg);

      //  $("#person_members option[value="+this.staffGroupUpdate.groupid+"]").attr('selected', 'null');
      this.router.navigate(['/persons',this.siteid])
    },
      error => {
        console.log("error exception");
        this.msg = error.error;


      }
    )
  }
  programTosite(i) {

    console.log("this is for rfgverer", this.selectedStaffs[i].firstname)
    console.log("this is for rfgverer", this.selectedStaffs[i].lastname)
    console.log("this is for rfgverer", this.selectedStaffs[i].staffid)

    console.log("this is for selected sites", this.programToSites)
    console.log("the selected doors are", this.selectedDoors)
    var programtotagid = (<HTMLInputElement>document.getElementById("tag_1")).value;
    console.log("the programtotagide ", programtotagid);
    this.programstaffId = this.programToSite;

  }

  retrieveToSite() {
    console.log("this is for retrieving the site")
    console.log("main doors are", this.selectedDoors)

  }

  onLogout() {
    this.router.navigate([''])
    localStorage.removeItem('data');
    localStorage.clear();
  }
  openModal(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editProfileForm.patchValue({
    firstname: "firstname",
    lastname: "lastname",
    username: "username",
    email: "email"
    });
   }
   backToPersons(){
    console.log("eghfvbdshcdvbcdcd")
    
      this.router.navigate(['dashboard/persons',this.siteid])
  
    
  }

}
