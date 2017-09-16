import { SongService } from '../Services/song.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


import { Song } from './../Modules/song';
import { Artist } from './../Modules/artist';
import { ArtistService } from './../Services/artist.service';

@Component({
    selector: 'song-edit',
    templateUrl: './../Views/songAddEditDialog.component.html',
    styleUrls: ['./../CSS/song.component.css'],
    providers: [ArtistService, SongService],
})

export class SongAddEditDialogComponent {
    selectedSong: Song;
    artistsOptions: Artist[];
    isCreate: boolean;
    title: string;

    constructor(public dialogRef: MdDialogRef<SongAddEditDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private artistService: ArtistService, private songService: SongService) {
        this.selectedSong = data.selectedSong;
        this.isCreate = data.isCreate;
        this.title = this.isCreate ? 'ADD NEW SONG' : `EDIT ${this.selectedSong.name}`;

        artistService.getAllArtists()
            .subscribe((allArtists) => {
                this.artistsOptions = allArtists;
            })
    }
    public save(): void {
        if (this.isCreate) {
            console.log('creating new song');
            this.songService.createSong(this.selectedSong)
                .subscribe((song) => {
                    console.log('new song created - id ' + song._id);
                    this.dialogRef.close();
                })
        } else {
            console.log('updating existing song');
            this.songService.updateSong(this.selectedSong)
                .subscribe((song) => {
                    console.log('song updated - id ' + song._id);
                    this.dialogRef.close();
                })
        }
    }

    artistControl: FormControl = new FormControl();

    displayNames(artistOption: Artist): string {
        return artistOption ? (artistOption.firstName + ' ' + artistOption.lastName) : artistOption.firstName;
    }

    saveSong(song: Song){
        if(this.title.localeCompare(`ADD NEW SONG`)){
            this.songService.createSong(song);
        }else{
            this.songService.updateSong(song);
        }
    }
}