import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginLogoutService {
  subject = new Subject<boolean>();
  isConnected(state: boolean) {
    this.subject.next(state);
  }
  getSubject() {
    return this.subject;
  }
}
