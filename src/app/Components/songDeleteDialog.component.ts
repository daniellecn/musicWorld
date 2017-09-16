import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Song } from './../Modules/song';
import { ArtistService } from '../Services/artist.service';
import { SongService } from './../Services/song.service';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'song-delete',
    templateUrl: './../Views/songDeleteDialog.component.html',
    styleUrls: ['./../CSS/song.component.css'],
    providers: [ArtistService]

})

export class SongDeleteDialogComponent {
    selectedSong: Song;
    constructor(public dialogRef: MdDialogRef<SongDeleteDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private songService: SongService,
        private snackBar: MdSnackBar) { 
            this.selectedSong = data.song;
        }
    onYesClick(song: Song): void {
        this.songService.removeSong(song._id.toString())
            .subscribe((songDel) => {
            this.snackBar.open(`${songDel.name} successfully deleted`, 'Created', {
            duration: 2000
          });
      }, (error) => {
            this.snackBar.open(`There was an error deleting the song`, 'Created', {
            duration: 2000
          });
      });
    }
}