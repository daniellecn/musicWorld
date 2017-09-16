import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../Modules/user';
import { UserService } from './../Services/user.service'

@Component({
  selector: 'login',
  template: '',
//   styleUrls: ['./CSS/login.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router){
  }
  ngOnInit(): void {
    this.userService.logout()
    .subscribe(() => {
      this.router.navigate(['']);
    }, error => {

    })
  }
}
