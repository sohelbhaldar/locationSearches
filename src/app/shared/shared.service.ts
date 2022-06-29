import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private mymessage = new Subject<any>();
  messageData$ = this.mymessage.asObservable();
  private partName = new Subject<any>();
  partNameData$ = this.partName.asObservable();
  private partIdName = new Subject<any>();
  partNameIdData$ = this.partIdName.asObservable();

  constructor() {

  }

  setPartValues(data: any) {
    this.partName.next(data);
    console.log(data)
  }

  setPartIdValues(data: number) {
    this.partIdName.next(data);
    console.log(data)
  }

  getPartIdValues(data: number) {
    this.partIdName.next(data);
    console.log(data)
  }

  getPartValues() {
    console.log(this.partName)
    return this.partName;
  }

  setSiteValues(data: any) {
    this.mymessage.next(data);
  }

  getSiteValues() {
    return this.mymessage;
  }

}
