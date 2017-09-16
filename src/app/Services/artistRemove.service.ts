import { ArtistService } from './artist.service';
import { HttpClient } from '@angular/common/http';
import { SongService } from './song.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { serverAddress } from './configurartion';
import { Artist } from './../Modules/artist';

interface ArtistResponse {
    artist: Artist;
}

@Injectable()
export class ArtistRemoveService {
    constructor(private http: HttpClient, private artistService: ArtistService, private songService: SongService) { }

    public removeArtist(artist: Artist): Observable<Artist> {
        const artistRemoved = new Subject<Artist>();
        this.http.delete<ArtistResponse>(`${serverAddress}/artist/${artist._id}`, {})
            .subscribe(data => {
                artistRemoved.next(data.artist);
            });

        return artistRemoved;
    }
}
