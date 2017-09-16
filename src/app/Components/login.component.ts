import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../Modules/user';
import { UserService } from './../Services/user.service'

@Component({
  selector: 'login',
  templateUrl: './../Views/login.component.html'
  //   styleUrls: ['./CSS/login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  connectedUser: User;
  showLoginError: boolean;

  constructor(private userService: UserService,
    private router: Router) {
    this.showLoginError = false;
  }

  login(user: User): void {
    this.userService.login(user.userName, user.password)
      .subscribe(() => {
        this.router.navigate(['']);
      }, (error) => {
        this.showLoginError = true;
      });
  }

  ngOnInit(): void {
    this.user = new User();
  }
}