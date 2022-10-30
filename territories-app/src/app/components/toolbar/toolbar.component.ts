import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  currentUser: any = {};
  user: any = {};

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.currentLoggedInUser.subscribe(
      (currentUser) => (this.currentUser = currentUser)
    );
  }

  logOut() {
    this.dataService.changeLoginStatus(undefined);
    this.router.navigate(['account/login']);
  }
}
