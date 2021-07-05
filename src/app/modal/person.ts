import { Door } from './door';
import { DoorGroup } from './door-group';
import { PersonClass } from './person-class';
import { PersonGroup } from './person-group';
import { Property } from './property';
import { ScheduleMain } from './schedule-main';

export class Person {
     personid:number;
	webappPerosnId:number;//logged customer or user id
	siteid:number;
	firstName:string;
	lastName:string;
	mobileNumber:string;
	personclassone:PersonClass;
    persongroup:Array<PersonGroup>
	gender:string;
	address1:string;
	address2:string;
    city:string;
	state:string;
	country:string;
	zipcode:string;
	expiraydate:string;
	propery:Array<Property>;
	tradeCode:number;
	email:string;
	schedule:Array<ScheduleMain>;
	doorGroup:Array<DoorGroup>
	doors:Array<Door>;
	createddate:string;
	sipurl:string;
	telnumber:string;
	areaCode:string;
	pid:number;
}
