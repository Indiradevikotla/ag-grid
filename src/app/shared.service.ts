import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _sendData = new BehaviorSubject([]);

  constructor() { }

  listenData(): Observable<any[]> {
    return this._sendData.asObservable();
  }

  updateData(data) {
      this._sendData.next(data);
  }
}
