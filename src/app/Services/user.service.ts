import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { serverAddress } from './configurartion';
import { User } from './../Modules/user';
import { HttpClient } from '@angular/common/http';

interface UserResponse {
    user: User;
}

@Injectable()
export class UserService {
    private connectedUserAnnouncer = new Subject<User>();
    constructor(private http: HttpClient) { }

    login(userName: string, password: string): Observable<User> {
        this.http.post<UserResponse>(`${serverAddress}/login`, {
            userName,
            password
        })
            .subscribe(data => {
                this.connectedUserAnnouncer.next(data.user);
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
            });

        return this.connectedUserAnnouncer;
    }

    logout(): Observable<User> {
        this.http.post(`${serverAddress}/logout`, {})
            .subscribe(data => {
                this.connectedUserAnnouncer.next(undefined);
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