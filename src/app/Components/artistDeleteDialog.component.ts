import { ArtistRemoveService } from '../Services/artistRemove.service';
import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Artist } from './../Modules/artist';
import { SongService } from '../Services/song.service';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'artist-delete',
    templateUrl: './../Views/artistDeleteDialog.component.html',
    styleUrls: ['./../CSS/song.component.css'],
    providers: [SongService]

})

export class ArtistDeleteDialogComponent {
    selectedArtist: Artist;
    constructor(public dialogRef: MdDialogRef<ArtistDeleteDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private artistService: ArtistRemoveService,
        private snackBar: MdSnackBar) { 
            this.selectedArtist = data.artist;
        }
    onYesClick(artist: Artist): void {
        this.artistService.removeArtist(artist).subscribe();
    }
}