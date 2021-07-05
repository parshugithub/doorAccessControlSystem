import { Door } from "./door";
import { EngineerTotalDoors } from "./engineertotaldoor";

export class EngineerSite {
    siteid:number;
    siteName:string;
    deviceID:number;
    doors:Array<EngineerTotalDoors>;
    createdDate:string
    customerid:number;
    // siteid:number;
    constructor(){}
}
