import { ScheduleDays } from './schedule-days';

export class ScheduleMain {
     scheduleId:number;
	 startTime:String;
	 endTime:String;
	 createdBy:String;
	 customerid:number;
	siteid:number;
	createdDate:Date;
	schedule:number;
    days:Array<ScheduleDays>;
}
