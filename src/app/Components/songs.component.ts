import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Song } from './../Modules/song';
import { Artist } from './../Modules/artist';
import { User } from './../Modules/user';
import { SongService } from './../Services/song.service';
import { UserService } from './../Services/user.service';
import { ArtistService } from './../Services/artist.service';
import { SongDetailDialogComponent } from './../Components/songDetailDialog.component';
import { SongAddEditDialogComponent } from './../Components/songAddEditDialog.component';
import { SongDeleteDialogComponent } from './../Components/songDeleteDialog.component';

interface QueryResponse {
    userQueries: { me?: User };
}

@Component({
    selector: 'songs',
    templateUrl: './../Views/songs.component.html',
    styleUrls: ['./../CSS/song.component.css'],
    styles: [`
        input {
            min-width: 100px;
        }
    `],
    providers: [ArtistService, SongService]
})
export class SongsComponent implements OnInit {
    songs: Array<Song>;

    displayedSongs: Array<Song>;
    title: string;
    private user: User;
    selectedSong: Song;

    songSearch: Song;

    constructor(private songsService: SongService,
        private userService: UserService,
        private router: ActivatedRoute,
        private cd: ChangeDetectorRef,
        public dialog: MdDialog) {
        this.displayedSongs = new Array<Song>();
        this.songs = new Array<Song>();
        this.songSearch = new Song();
    }

    ngOnInit(): void {
        this.getSongs();
        this.userService.me().subscribe((user) => {
            this.user = user;
        });
    }

    getSongs(): void {
        this.songsService.getSongs()
            .subscribe((songs) => {
                console.log('songs.component - getSongs invoked');
                this.songs = songs;
                this.refilter();
            })
    }

    refilter(): void {
        this.displayedSongs = this.songs.filter((song: Song) => this.filterSong(song));
    }

    private filterSong(song: Song) {
        if (!this.songSearch.album && !this.songSearch.name && !this.songSearch.genere)
            return true;
        else {
            let isRelevant = false;

            if (this.songSearch.name) {
                if (song.name)
                    isRelevant = song.name.startsWith(this.songSearch.name);
                else
                    return false;
            }
            if (this.songSearch.album) {
                if (song.album)
                    isRelevant = isRelevant || song.album.startsWith(this.songSearch.album);
                else
                    return false;
            }
            if (this.songSearch.genere) {
                if (song.genere)
                    isRelevant = isRelevant || song.genere.startsWith(this.songSearch.genere);
                else
                    return false;
            }
            return isRelevant;
        }
    }

    songDetailDialog(song: Song): void {
        const dialogRef = this.dialog.open(SongDetailDialogComponent, {
            height: '500px',
            data: { selectedSong: song },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    songDeleteDialog(song: Song): void {
        let dialogRef = this.dialog.open(SongDeleteDialogComponent, {
            width: '250px',
            data: {
                song
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getSongs();
            //   alert(result);
        });
    }

    songEditDialog(song: Song): void {
        let isCreate = false;
        if (song == null) {
            this.selectedSong = new Song();
            this.selectedSong.artist = new Artist();
            isCreate = true;
        }
        else {
            this.selectedSong = Object.assign({}, song, {
                artist: Object.assign({}, song.artist)
            });
        }

        let dialogRef = this.dialog.open(SongAddEditDialogComponent, {
            height: '500px',
            width: '750px',
            data: {
                selectedSong: this.selectedSong,
                isCreate
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getSongs();
            //   alert(result);
        });
    }
}