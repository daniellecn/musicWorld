import { UserService } from './Services/user.service';
import { User } from './Modules/user';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

interface QueryResponse {
  userQueries: { me?: User };
}
@Component({
  selector: 'my-app',
  templateUrl: './Views/app.component.html',
  styleUrls: ['./CSS/app.component.css']
})
export class AppComponent implements OnInit {
  private user: User;
  constructor(private userService: UserService, private snackBar: MdSnackBar) { }

  public ngOnInit(): void {
    this.userService.connectedUser()
      .subscribe((user) => {
        console.log(user);
        if (user && !this.user) {
          this.user = user;
        } else if (!user && this.user) {
          this.user = user;
        }
      });

    // this.userService.subscribeToNewUsers()
    //   .subscribe(({ userCreated }) => {
    //       this.snackBar.open(`${userCreated.firstName} ${userCreated.lastName} joined our app YAYYY`, 'Created', {
    //         duration: 2000
    //       });
    //   });
  }
}
