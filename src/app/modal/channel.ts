import { Door } from './door';
import { Tag } from './tag';

export class Channel {
     channelid:number;
	 channel:number;
	 flat:number;
	 ppp:number;
	 customerid:number;
	 siteid:number;
	 createdDate:Date;
	 createdBy:Date;
	 door:Array<Door>;
	 tags:Array<Tag>;
	 
}
