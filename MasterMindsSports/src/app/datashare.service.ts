
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataShareService {

  private datShareSubject = new BehaviorSubject<any>('');
  getDataShare = this.datShareSubject.asObservable();

  setDataShare(data: any) {      
    this.datShareSubject.next(data);
  }
  
}

