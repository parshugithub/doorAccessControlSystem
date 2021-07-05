import { Person } from "./person";
import { PersonGroup } from "./person-group";
import { ScheduleMain } from "./schedule-main";
import{ DoorDescription } from "./door-description";
export class DoorManagement {
   doorid:number;
	doorname:string;
	tradecode:string;
	locktime:string;
	accessType:string;
	 custidnumber;
	siteid:number;
    createddate:string;
	 updateddate:string;
	 schedule:Array<ScheduleMain>;
	 person:Array<Person>;
	 persongroup:Array<PersonGroup>;
	 doordesc:Array<DoorDescription>;
}
