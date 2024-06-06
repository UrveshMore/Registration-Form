import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  formDataArray=[];
registrationData=new BehaviorSubject<any>([]);
  constructor() { }


}
