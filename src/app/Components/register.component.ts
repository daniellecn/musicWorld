import { User } from '../Modules/user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../Services/user.service'

@Component({
  selector: 'login',
  templateUrl: './../Views/register.component.html'
  //   styleUrls: ['./CSS/login.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() user: User;
  showRegError: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.showRegError = false;
  }

  register(user: User): void {
    this.userService.register(user)
      .subscribe(() => {
        console.log('got data');
        this.router.navigate(['']);
      }, (error) => {
        this.showRegError = true;
        console.log('there was an error sending the query', error);
      });
  }

  ngOnInit(): void {
    this.user = new User();
  }
}