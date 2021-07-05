import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Door } from '../modal/door';
import { ProgramToSite } from '../modal/program-to-site';
import { ScheduleMain } from '../modal/schedule-main';
import { Site } from '../modal/sitemodal';
import { Staff } from '../modal/staff';
import { StaffGroup } from '../modal/staff-group';
import { StaffGroupTags } from '../modal/staffgrouptags';
import { MoveToSiteService } from '../service/move-to-site.service';
import { ProgramToSiteService } from '../service/program-to-site.service';
import { RegistrationService } from '../service/registration.service';
import { SitemanagementService } from '../service/sitemanagement.service';
import { StaffGroupService } from '../service/staff-group.service';
import { StaffService } from '../service/staff.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-staffmanagement',
  templateUrl: './staffmanagement.component.html',
  styleUrls: ['./staffmanagement.component.scss']
})
  export class StaffmanagementComponent implements OnInit {
  editProfileForm: FormGroup;
  updatestaff = new Staff();
referStaffId:any;
  show = 8;
  tagsReference: any = [];
errorResponse:any;
  staffList: any;
  val: number;
  taglist: number = 0;
  count = 1;
  singledoor: any;
  flag: boolean = true;
  colorvalue: any;
  singlestaff: any;
  checkbox: boolean;
  tagsAll: any;
  selectedTags: any = [];
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
  increaseShow() {
    this.show += 8;
    console.log(this.show)
  }
  public showRate;
  public selectionModel;
  staffGroupName = "";
  groupid: number;
  programstaffId: any;
  staffGroup = new StaffGroup();
  staffGroupnameVal :any;
  staffGroupUpdate = new StaffGroup();
  programToSite = new ProgramToSite();
  staffGroupArray: StaffGroup[] = [];
  staffTags: StaffGroupTags[] = [];
  groupName;
  staffgroupid: any
  site: Site[] = [];
  msg = '';
  closeResult: string;
  staff: Staff[] = [];
  staffsSchedule: ScheduleMain[] = [];
  staffsScheduleid: ScheduleMain[]
  satffgroupvales: any = {};
  staffvalues: any = [];
  staff1 = new Staff();
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
  schedule =[];
  selectedFinalScheduleIds=[];

  constructor(public StaffManagementservice: StaffService, private router: Router,public userService: UserService,
    public staffservice: StaffService, private route: ActivatedRoute, private programToSiteService: ProgramToSiteService, private moveToSite: MoveToSiteService,
    public _service: RegistrationService, 
    private modalService: NgbModal, public datepipe: DatePipe,
    private toaster: ToastrService, private staffGroupService: StaffGroupService, private siteManagementservice: SitemanagementService,
    public ngbModalService: NgbActiveModal, public siteService: SitemanagementService,private fb: FormBuilder) {
    
  }
  customerResponce;
  response;
  data = JSON.parse(localStorage.getItem("acesscontroldata"));
  numberOfStaffs: number[] = new Array(8)

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']

      
     });
    

    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    console.log(data);
    console.log("The customer response ", data)
    console.log("The id is", data.id)
    this.StaffManagementservice.getAll(data.id).subscribe((response: Staff[]) => {
      console.log("the staff group ", response)
      this.staffvalues = response;
      console.log("response staff group", this.satffgroupvales)
      console.log("the group", this.staffvalues);
      console.log("the res", response);
      this.staff = response;
      console.log("the staff id is ",this.staff)
      var totalength = response.length;
      console.log(totalength)
      for (this.staffList = 1; this.staffList <= totalength; this.staffList++) {
        this.count++;
      }
      console.log(this.count);



      console.log("the staff", this.staff);
    })

    this.StaffManagementservice.getSchedueles(data.id).subscribe((response: ScheduleMain[]) => {
      console.log("the staff group ", response)

      this.staffsSchedule = response;
      


      console.log("the staff", this.staff);
    })

    this.siteManagementservice.getAll(data.id).subscribe((data: Site[]) => {
      console.log(data);
      this.site = data;
    })
    this.getStaffs();
    this.gettingAllStaffGroup();

    this.moveToSite.getDoor().subscribe((Response: Door[]) => {
      console.log("the door response ", Response);
      this.totalDoors = Response;

      this.accessingDoorNumber = this.totalDoors.map(t => t.doorName);
      console.log("this is accessing doornumber name", this.accessingDoorNumber);
      this.doors = this.accessingDoorNumber;
    })

    // this.userService.getIpAddress().subscribe((IPAddress: Createuser[])=>{     
    //   console.log("this is the response for ip address active or not",IPAddress);
    // })

    // $(document).ready(function(){
    //   debugger;
    //   $('#datevaleUpdate').val(new Date(JSON.parse(localStorage.getItem("DMExpiryDate"))).toISOString().substr(0, 16));
    //   });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
    for (let i = 0; i < this.numberOfStaffs.length; i++) {
      this.numberOfStaffs[i] = i;
    }
  }
  onChangeStaff(stafff) {
    console.log("The staff ", stafff)


  }

  gettingAllStaffGroup() {
    let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    this.staffGroupService.getAll(data.id).subscribe((data: StaffGroup[]) => {
      console.log(data);
      this.staffGroupArray = data;
      console.log("all staff groups", this.staffGroupArray);
    })
  }


  getSitesForStaffGroup(i) {
    console.log("The event ", event);
    var siteName = (<HTMLInputElement>document.getElementById("site" + i)).textContent
    console.log("The site ", siteName);
    this.siteService.getSite(siteName)
      .subscribe(data => {
        console.log("getting site", data)
        this.selectedSites.push(data)
      }, error => console.log(error));
    console.log(this.site)
  }

  checked(scheduleId) {
    if (this.selectedScheduleIds.indexOf(scheduleId) != -1) {
      return true;
    }
  }


  getScheduleForStaff(j,scheduleidval,checked)
  {
    if(checked){
      this.schedule.push(scheduleidval);
      (<HTMLInputElement>document.getElementById("scheduleval" +scheduleidval)).value=checked;
    console.log("the selcted schedule are ",(<HTMLInputElement>document.getElementById("scheduleval" +scheduleidval)).value=checked);
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
      this.colorvalue = (<HTMLInputElement>document.getElementById("door" + k)).style.backgroundColor = "";
      console.log("if flag 2", this.flag)
      this.flag = false;


    }
    else {
      console.log("else flag 1", this.flag)
      this.flag = true;
      console.log(" another if called");
      this.colorvalue = (<HTMLInputElement>document.getElementById("door" + k)).style.backgroundColor = "#2262c6ff";
      this.flag = true;
      console.log("else flag 2", this.flag)

    }
    if (this.colorvalue == '') {
      this.selectDoorForStaffGroup(door)
    }

  }





  selectDoorForStaffGroup(door) {
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
  getStaffToMap(val, i) {
    console.log("this i qwedqwdqwd wedqw", val)
    var staffsid = (<HTMLInputElement>document.getElementById("staff_members" + i)).value;
    console.log("erfygeryfgbfer", staffsid)
    this.StaffManagementservice.getStaff(staffsid).subscribe((data: Staff) => {
      console.log("selected satff ", data);
      this.singlestaff = data;
      this.selectedStaffs.push(this.singlestaff);

    })

    console.log("staff id is ", staffsid)
    this.programstaffId = staffsid
  }

  onChangeStaffGroup(value) {
    console.log("this is getting value", value);
    this.groupid = value;
    console.log("this is groupid", this.groupid)
    // this.staffGroupName = this.selectionModel.staffGroupName;
    var groupName = this.selectionModel.staffGroupName;
    // console.log(groupName);
    // this.staffgroupid = this.selectionModel.groupid;
    // console.log(this.staffgroupid);

    this.staffGroupService.getStaffGroup(this.groupid).subscribe((staffgroupresponse) => 
    {
      console.log("the staff group name ",staffgroupresponse.staffGroupName);
      (<HTMLInputElement>document.getElementById("staff_group_name")).value = staffgroupresponse.staffGroupName;
      //this.staffGroupnameVal=data;
    //   (<HTMLInputElement>document.getElementById("staff_group_name")).value = this.staffGroupnameVal.staffGroupname;
      console.log("response of staff group ", staffgroupresponse);
      this.selectedStaffs.length = 0;
      this.selectedDoors.length = 0;
      this.selectedTags.length = 0;
      this.selectedSites.length = 0;

      for (let i = 1; i < 8; i++) {
        console.log("empty calling");
        (<HTMLInputElement>document.getElementById("tag_" + i)).value = "0";
      }
      for (let i = 0; i < this.numberOfStaffs.length; i++) {
        console.log("staff calling");
        $("#staff_members" + i).attr('selectedIndex', '-1').find("option:selected").removeAttr("selected");
      }
       

      for (let i = 0; i < this.totalDoors.length; i++) {
        console.log("door calling");

        // (<HTMLInputElement>document.getElementById("door"+i)).value = " ";
        (<HTMLInputElement>document.getElementById("door" + i)).style.backgroundColor = "#2262c6ff"
      }
for (let i = 0; i <= this.site.length; i++) {
        console.log("site calling");
        let j=i+1;
       //var checkboxes = document.getElementById("siteval" + (i + 1));
      // this.checkbox = false;
       $('input:checkbox').prop('checked', false);
      //  $("input:checkbox").prop('checked', $(this).prop("checked"));
    // (<HTMLInputElement>document.getElementById("siteval" + j)).checked=false;
     // checkboxes.checked  = false;
      }
      // this.tagsReference.tagNumber=data.tags;
      // console.log("response of staff group tagresponse",this.tagsReference.tagNumber);

      // (<HTMLInputElement>document.getElementById("tag_1")).value = data.tags;

      console.log("the staff length", staffgroupresponse.staffManyToMany.length)
      console.log("the response of staff first and last name", staffgroupresponse.staffManyToMany)
      for (let i = 0; i < staffgroupresponse.staffManyToMany.length; i++) {
        console.log("staff id is ", staffgroupresponse.staffManyToMany[i].staffid)
        this.val = staffgroupresponse.staffManyToMany[i].staffid;
        console.log("asjhdkajs", this.val);
        //var x=  $("#staff_members"+j+"option[value=2]").attr('selected', 'selected');
        $("#staff_members" + i + " option[value=" + this.val + "]").attr('selected', 'selected');
        console.log("res");
        this.selectedStaffs.push(staffgroupresponse.staffManyToMany[i]);
        //  (<HTMLInputElement>document.getElementById("staff_members"+i)).value(data.staffManyToMany[i].staffid).attr('selected', 'selected');

      }
      for (let i = 0; i < staffgroupresponse.doors.length; i++) {
        console.log("the doors respose is", staffgroupresponse.doors[i].doorName);
        var num = staffgroupresponse.doors[i].doorName;
        console.log("The door is ", num)
        var n = num.toString();
        let door = staffgroupresponse.doors[i].doorName;
        (<HTMLInputElement>document.getElementById("door" + (num - 1))).value = n;
        (<HTMLInputElement>document.getElementById("door" + (num - 1))).style.backgroundColor = ""
        this.selectDoorForStaffGroup(num)
        this.flag = false;

      }

      for (let i = 0; i < staffgroupresponse.sites.length; i++) {
        var site = staffgroupresponse.sites[i].siteid;
        (<HTMLInputElement>document.getElementById("siteval" + site)).checked = true;
        console.log("the selected sites are ", staffgroupresponse.sites[i])
        this.getSitesForStaffGroup(i);
        this.programToSites = staffgroupresponse.sites[i]

      }

      for (let i = 0; i < staffgroupresponse.tags.length; i++) {
        this.taglist++;
        console.log("the staff group tags are", staffgroupresponse.tags)
        var tagid = staffgroupresponse.tags[i].id;
        var tagnumber = staffgroupresponse.tags[i].tagNumber;
        var tag = tagnumber.toString();
        (<HTMLInputElement>document.getElementById("tag_" + (i + 1))).value = tag;
        console.log("this is the selected final tag number", tag)
        this.selectedTags.push(staffgroupresponse.tags[i])
      }
      // console.log("all staff groups", this.staffGroupArray);
    })

    // this.staffgroupid = this.staffgroupid
    // this.showRate = this.staffGroupArray.find(o => o.staffGroupName == this.selectionModel.staffGroupName);
  }
  showDropdown(dropdown) {
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);

  }

  remove_staff_group_modal() {
    console.log("for deleting purpose only", this.groupid)
    this.staffGroupService.deleteStaffGroup(this.groupid)
      .subscribe((res) => {
        console.log("this is the response for deleting",res);
        this.toaster.success(res);
        window.location.reload();
      },error =>{
        if(error.status==422){
          this.msg="Failed to delete,  Please delete the staff associated with this Group"
          this.toaster.error(this.msg);

        }else if(error.status==500){
          this.msg="Internal Server Error"
          this.toaster.error(this.msg);

        }
       else  {
        this.msg="Failed To Request";
        this.toaster.error(this.msg);

       }

      }
      
      );


  }



  getStaffs() {
    this.staff = null; //or create new contrats object

    this.StaffManagementservice.getAll(this.data.id).subscribe((data: Staff[]) => {
      console.log(data);
      this.staff = data;
    })
  }

  reloadDashboard(){
    window.location.reload();
  
  }

  createStaff() {

    let dataval = JSON.parse(localStorage.getItem("acesscontroldata"));
    let id1 = dataval.id;
    let staffval = new Staff();
    let x = (<HTMLInputElement>document.getElementById("datevale")).value;
    this.jstoday = x;
    this.jstoday = formatDate(x, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    this.jstoday1 = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');
    console.log("date is", this.jstoday);
    console.log("before ", x)


    this.staff1.expiraydate = this.jstoday;

    console.log("rrt", this.staff1.expiraydate)

    this.staff1.createdDate = this.jstoday1;
    // const staffScheduleId = Object.assign({}, this.selectedScheduleIds);
    // console.log("The staff before is", staffScheduleId);

     this.staff1.schedule=this.selectedScheduleIds;
    
    console.log("The staff resulat is", this.staff1);

    this.staffservice.create(this.staff1, this.data.id).subscribe(
      (res) => {
        this.getStaffs();
        this.toaster.success(res)
        this.getStaffs();
        this.reloadDashboard();
        this.ngbModalService.close();
        // this.router.navigate(['/dashboard'])
      },
      error => {
        console.log("error exception");
        this.msg = error.error;


      })
  }
  goBack() {
    this.router.navigate(['/staffmanagement'])
  }
  update(staffid) {
    console.log("this is the staff id",staffid);
    // this.router.navigate(['staffmanagement/editstaff', staffid]);
    console.log("done")

this.referStaffId=staffid
    this.staffservice.getStaff(staffid)
      .subscribe(data => {
        console.log("getting staff", data)
    
        this.updateSingleStaff(data);
        data.expiraydate = new Date((data.expiraydate.toString())).toISOString().substr(0, 16);
      }, error => console.log(error));


  }


  updateStaff() {
    console.log("called");
   let data = JSON.parse(localStorage.getItem("acesscontroldata"));
    let x = (<HTMLInputElement>document.getElementById("datevaleUpdate")).value;
    this.jstoday=x;
    this.jstoday = formatDate(x, 'yyyy-MM-dd hh:mm:ss ', 'en-US', '+0530');

    this.updatestaff.staffgroup=this.updatestaff.staffgroup;
    this.updatestaff.expiraydate = this.jstoday;
    
    this.staffservice.updateStaffData(this.referStaffId,data.id, this.updatestaff).subscribe(
      (res) => {
        this.msg="updated Staff Successfulluy";
        this.toaster.success(this.msg);
        // this.getStaffs();
        this.reloadDashboard();
      },
      error => {
        this.msg ="Internal Server error";
        this.toaster.error(this.msg);


      }
    )
  }




  // onSubmit() {
  //   this.updateStaff();
  // }


  updateSingleStaff(staff) {
   
    console.log("update staff", staff)
    this.updatestaff = staff;
    for(let i=0;i<staff.staffschedule.length;i++){
      if(this.schedule.length<1){
        this.schedule.push(staff.staffschedule[i].scheduleId)

      }

    

    }
    console.log("updated staff", this.updatestaff )
   }
  
  onSubmitUpdateStaff() {
    this.updateStaff();
  }


  deleteStaffCalling(staffid) {
    if (confirm("Are you sure to delete " + staffid)) {
    this.router.navigate(['/staffmanagement'])
    
    this.staffservice.deleteStaff(staffid)
    .subscribe(() => {
   
    this.getStaffs();
   
    });
    } else {
    console.log("you are not allowing delete")
    }
    }
  
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/staffmanagement']);
  }

  create_staff_group() {
    console.log("doors are ", this.selectedDoors);
    
    this.staffGroupName= (<HTMLInputElement>document.getElementById("staff_group_name")).value ;
    //console.log("staff group name ",staffGroupName);
    if (this.staffGroupName == "") {
      alert("Staff group name can not be blank");
    }
    else{

      console.log(this.data.id)
      console.log(this.staffGroup);
      this.staffGroup.staffManyToMany = this.selectedStaffs
      this.staffGroup.sites = this.selectedSites;
      // this.staffGroup.staffGroupName=staffGroupname
      this.staffGroup.doors = this.selectedDoors
      this.date = new Date();
      this.staffGroupcreatedeDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');
      // console.log("this is new date",this.tradeDate);
      this.staffGroup.createdDate = this.staffGroupcreatedeDate
      console.log("the staff group obj ", this.staffGroup)
  console.log("selection val ",this.selectionModel)
      this.staffGroupService.create(this.staffGroup, this.data.id).subscribe(
        (res) => {
           this.toaster.success(res)
          this.gettingAllStaffGroup()
        },
        error => {
          
          this.toaster.error(error)
        }
      )
    }

  }

  onSubmit() {
    this.update_staff_group();
  }
  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  update_staff_group() {
    var tag;

    //let tagObject = new StaffGroupTags();
    console.log("the taglist is ", this.taglist);
    this.selectedTagslist.push(this.taglist);
    console.log("group id", this.groupid);
    this.selectedTags.length = 0;
    for (let i = 0; i <this.taglist; i++) {
      console.log("calling for")
      var tagnumber = (<HTMLInputElement>document.getElementById("tag_" + (i + 1))).value;
      let tagObject = new StaffGroupTags();
      console.log("the tag ", tagnumber)
      tag = tagnumber;
      console.log("new tag ", tag)
      tagObject.tagNumber = tag;
      this.tagsAll = tagObject
      this.selectedTags.push(this.tagsAll);
      console.log("the selected tags are ", this.selectedTags);
    }
    console.log("the tags are ", this.selectedTags);
    this.date = new Date();
    this.staffGroupcreatedeDate = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss');

    console.log("called");
    var staffGroupname = (<HTMLInputElement>document.getElementById("staff_group_name")).value;
    this.staffGroupUpdate.staffManyToMany = this.selectedStaffs
    this.staffGroupUpdate.sites = this.selectedSites;
    this.staffGroupUpdate.staffGroupName = staffGroupname;
    this.staffGroupUpdate.doors = this.selectedDoors;
    this.staffGroupUpdate.tags = this.selectedTags;
    this.staffGroupUpdate.createdDate=this.staffGroupcreatedeDate

    console.log("this is final update staffgroup", this.staffGroupUpdate);
    this.staffGroupService.updateStaffGroupData(this.groupid, this.staffGroupUpdate,this.data.id).subscribe(
      (res) => {
        console.log(res);
        this.msg="Updated Stafff Group Successfully";
        this.toaster.success(this.msg);
        $("#staff_group_members option[value="+this.staffGroupUpdate.groupid+"]").attr('selected', 'null');
        this.router.navigate(['/staffmanagement'])
        this.gettingAllStaffGroup();
       // window.location.reload();

      },
      error => {
        this.msg = "Internal Server Error"
        this.toaster.error(this.msg);


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
    // this.singlestaff.firstname=this.programToSite;
    // this.singlestaff.lastname=this.programToSite;
    // this.selectedSites=this.programToSite;
    // this.selectedDoors=this.programToSite;
    // console.log("this is object for program to site",this.programToSite);
    // this.programToSiteService.create().subscribe(
    //   (res) => {

    //     this.toaster.success(res)

    //   },
    //   error => {
    //     this.toaster.error(error)      }
    // )

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

}
