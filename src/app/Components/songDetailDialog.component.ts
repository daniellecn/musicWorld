import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { Song } from './../Modules/song';
import { Artist } from './../Modules/artist';
import { SongService } from './../Services/song.service';
import { ArtistService } from '../Services/artist.service';

@Component({
  selector: 'song-Dialog',
  templateUrl: './../Views/songDetailDialog.component.html',
  styleUrls: ['./../CSS/song.component.css'],
  providers: [ArtistService]
})
export class SongDetailDialogComponent implements OnInit { 
    title: string;
    song: Song;

    constructor(@Inject(MD_DIALOG_DATA) public data: any, private songService: SongService) {
        this.song = data.selectedSong;
     }

    ngOnInit(): void{
        this.title = 'Detail';
        this.songService.songViewed(this.song).subscribe();
    }

    cancel(): void{
    }
}