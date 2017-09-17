import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { serverAddress, socket } from './configurartion';
import { User } from './../Modules/user';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { MdSnackBar } from '@angular/material';


interface UserResponse {
    user: User;
}

@Injectable()
export class UserService {
    private connectedUserAnnouncer = new Subject<User>();

    constructor(private http: HttpClient, private snackBar: MdSnackBar) {
        socket.on('loggedin', function (userName: string) {
            alert("The User " + userName + " LoggedIn");
        });
        socket.on('loggedout', function () {
            alert("No User Is logged in");
        });
        socket.on('registerd', function (user: User) {
            snackBar.open(`${user.firstName} ${user.lastName} joined our app YAYYY`, 'Created', {
                duration: 2000
            });
        });
    }

    login(userName: string, password: string): Observable<User> {
        this.http.post<UserResponse>(`${serverAddress}/login`, {
            userName,
            password
        })
            .subscribe(data => {
                this.connectedUserAnnouncer.next(data.user);
                socket.emit('login', { userName, password });
            });

        return this.connectedUserAnnouncer;
    }

    register(user: User): Observable<User> {
        this.http.post<UserResponse>(`${serverAddress}/user`, {
            userName: user.userName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        })
            .subscribe(data => {
                this.connectedUserAnnouncer.next(data.user);
                socket.emit('register', data.user);

            });


        return this.connectedUserAnnouncer;
    }

    logout(): Observable<User> {
        this.http.post(`${serverAddress}/logout`, {})
            .subscribe(data => {
                this.connectedUserAnnouncer.next(undefined);
                socket.emit('logout');
            });
        return this.connectedUserAnnouncer;
    }

    connectedUser(): Observable<User> {
        this.http.get<UserResponse>(`${serverAddress}/me`)
            .subscribe(data => {
                this.connectedUserAnnouncer.next(data.user);
            }, error => {
                this.connectedUserAnnouncer.next(undefined);
            });

        return this.connectedUserAnnouncer;
    }

    me(): Observable<User> {
        const me = new Subject<User>();
        this.http.get<UserResponse>(`${serverAddress}/me`)
            .subscribe(data => {
                me.next(data.user);
            }, error => {
                me.next(undefined);
            });

        return me;
    }

    public subscribeToNewUsers(): Observable<{ userCreated: User }> {
        return undefined;
    }
}