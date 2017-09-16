import { ArtistService } from './artist.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { serverAddress } from './configurartion';
import { HttpClient } from '@angular/common/http';
import { Song } from './../Modules/song';

interface SongResponse {
    song: Song;
}

@Injectable()
export class SongService {
    private allSongsAnnouncer = new Subject<Song[]>();
    private topSongsAnnouncer = new Subject<Song[]>();

    constructor(private http: HttpClient, private artistService: ArtistService) { }

    getSongs(): Observable<Song[]> {
        this.http.get<{ songs: Song[] }>(`${serverAddress}/songs`)
            .subscribe((data) => {
                this.allSongsAnnouncer.next(data.songs);
            });

        return this.allSongsAnnouncer;
    }

    getTopSongs(): Observable<Song[]> {
        this.http.get<{ topSongs: Song[] }>(`${serverAddress}/topSongs`)
            .subscribe((data) => {
                this.topSongsAnnouncer.next(data.topSongs);
            });

        return this.topSongsAnnouncer;
    }

    removeSong(id: string): Observable<Song> {
        const songRemoved = new Subject<Song>();
        this.http.delete<SongResponse>(`${serverAddress}/song/${id}`, {})
            .subscribe(data => {
                songRemoved.next(data.song);
            });

        return songRemoved;
    }

    createSong(song: Song): Observable<Song> {
        const songCreated = new Subject<Song>();
        this.http.post<SongResponse>(`${serverAddress}/song`, {
            name: song.name,
            artist: song.artist,
            album: song.album,
            publisher: song.publisher,
            publicationYear: song.publicationYear,
            genere: song.genere,
            words: song.words
        })
            .subscribe(data => {
                songCreated.next(data.song);
            });

        return songCreated;
    }

    updateSong(song: Song): Observable<Song> {
        const songUpdated = new Subject<Song>();
        this.http.post<SongResponse>(`${serverAddress}/song/${song._id}`, {
            name: song.name,
            artist: song.artist._id,
            album: song.album,
            publisher: song.publisher,
            publicationYear: song.publicationYear,
            genere: song.genere,
            words: song.words
        })
            .subscribe(data => {
                songUpdated.next(data.song);
            });

        return songUpdated;
    }

    songViewed(song: Song): Observable<Song> {
        const songViewed = new Subject<Song>();
        this.http.post<SongResponse>(`${serverAddress}/song/${song._id}/viewed`, {})
            .subscribe(data => {
                songViewed.next(data.song);
            });

        return songViewed;
    }
}