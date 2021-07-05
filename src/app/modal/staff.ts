import { ScheduleMain } from './schedule-main';
import { StaffGroup } from './staff-group';

export class Staff {
    staffid:number;
    firstname:string;
    lastname:string;
    payrollno:string;
    expiraydate:String;
    createdDate:string;
    staffgroup:StaffGroup;
    schedule:Array<ScheduleMain>;
    
    constructor(){}
}
