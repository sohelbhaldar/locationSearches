import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private mymessage = new Subject<any>();
  messageData$ = this.mymessage.asObservable();
  constructor() {

  }
  setSiteValues(data: any) {
    this.mymessage.next(data);
  }

  getSiteValues() {
    return this.mymessage;
  }

}
