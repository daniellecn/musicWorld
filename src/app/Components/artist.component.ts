import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Artist } from './../Modules/artist';
import { User } from './../Modules/user';
import { ArtistService } from './../Services/artist.service';
import { SongService } from '../Services/song.service';
import { UserService } from './../Services/user.service';
import { ArtistDetailDialogComponent } from './../Components/artistDetailDialog.component';
import { ArtistAddEditDialogComponent } from './../Components/artistAddEditDialog.component';
import { ArtistDeleteDialogComponent } from './artistDeleteDialog.component';

@Component({
    selector: 'artist',
    templateUrl: './../Views/artist.component.html',
    styles: [`
        .form-inline {
            margin-top: auto;
            margin-bottom: 10px;
        }
        .form-group {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
        .form-group>input{
            min-width: 100px;
        }
        #google-map {
            width: auto;
            height: 500px;
        }
    `],
    styleUrls: ['./../CSS/song.component.css'],
    providers: [SongService]
})

export class ArtistComponent implements OnInit {
    private user: User;
    artists: Array<Artist>;
    showTable: boolean = false;
    selectedArtist: Artist;
    title: string;
    @Input() artistSearch: Artist;

    public latitude: number;
    public longitude: number;
    public zoom: number;

    constructor(private artistService: ArtistService,
        private userService: UserService,
        private router: Router,
        public dialog: MdDialog) {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.artistSearch = new Artist();
    }

    ngOnInit(): void {
        if ("geolocation" in navigator) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.zoom = 12;
                  });
            }
        }

        this.artists = new Array<Artist>();

        this.searchArtist(this.artistSearch);
        this.userService.me().subscribe((user) => {
            this.user = user;
        });
    }

    searchArtist(artistSearch: Artist): void {
        this.showTable = true;

        this.artistService.searchArtists(artistSearch.firstName, artistSearch.lastName, artistSearch.country)
            .subscribe((artists) => {
                this.artists = artists;
            });
    }

    artistDetailDialog(artist: Artist): void {
        const dialogRef = this.dialog.open(ArtistDetailDialogComponent, {
            height: '500px',
            data: { selectedArtist: artist },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    artistDeleteDialog(artist: Artist): void {
        const dialogRef = this.dialog.open(ArtistDeleteDialogComponent, {
            height: '500px',
            data: { artist },
        });

        dialogRef.afterClosed().subscribe(result => {
            this.searchArtist(this.artistSearch);
        });
    }

    artistEditDialog(artist: Artist): void {
        let isCreate = false;
        if (artist == null) {
            this.selectedArtist = new Artist();
            isCreate = true;
        }
        else {
            // data returned from graphql is readonly
            this.selectedArtist = Object.assign({}, artist);
        }

        let dialogRef = this.dialog.open(ArtistAddEditDialogComponent, {
            height: '650px',
            width: '750px',
            data: {
                selectedSong: this.selectedArtist,
                isCreate
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.searchArtist(this.artistSearch);
        });
    }
}