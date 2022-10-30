import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private currentUserSource = new BehaviorSubject<any>(undefined);
  currentLoggedInUser = this.currentUserSource.asObservable();

  constructor() {}

  changeLoginStatus(user: any) {
    this.currentUserSource.next(user);
  }
}
