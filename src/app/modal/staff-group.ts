import { Door } from './door';
import { Site } from './sitemodal';
import { Staff } from './staff';
import { StaffGroupTags } from './staffgrouptags';

export class StaffGroup {
    groupid:number;
    staffGroupId:number;
    staffGroupName:string;
    createdBy:string;
    createdDate:Date;
    customerid:number;
    staffManyToMany:Array<Staff>;
    sites:Array<Site>;
    doors:Array<Door>;
    tags:Array<StaffGroupTags>

    
    constructor(){}
}