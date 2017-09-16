import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { serverAddress } from './configurartion';
import { Artist } from './../Modules/artist';

interface ArtistsResponse {
    artists: Artist[];
}

interface ArtistResponse {
    artist: Artist;
}

@Injectable()
export class ArtistService {
    private searchArtistsAnnouncer = new Subject<Artist[]>();
    private topArtistAnnouncer = new Subject<Artist[]>();
    private allArtistAnnouncer = new Subject<Artist[]>();
    constructor(private http: HttpClient) { }

    searchArtists(firstName: string, lastName: string, country: string): Observable<Artist[]> {
        let params = new HttpParams();
        if (firstName) {
            params = params.append('firstName', firstName);
        }
        if (lastName) {
            params = params.append('lastName', lastName);
        }
        if (country) {
            params = params.append('country', country);
        }
        this.http.get<ArtistsResponse>(`${serverAddress}/artists/search`, {
            params,
        })
            .subscribe(data => {
                this.searchArtistsAnnouncer.next(data.artists);
            });

        return this.searchArtistsAnnouncer;
    }

    getTopArtists(): Observable<Artist[]> {
        this.http.get<{ topArtists: Artist[] }>(`${serverAddress}/topArtists`)
            .subscribe(data => {
                this.topArtistAnnouncer.next(data.topArtists);
            });

        return this.topArtistAnnouncer;
    }

    getAllArtists(): Observable<Artist[]> {
        this.http.get<ArtistsResponse>(`${serverAddress}/artists`)
            .subscribe(data => {
                this.allArtistAnnouncer.next(data.artists);
            });

        return this.allArtistAnnouncer;
    }

    createArtist(artist: Artist): Observable<Artist> {
        const artistCreated = new Subject<Artist>();
        this.http.post<ArtistResponse>(`${serverAddress}/artist`, {
            firstName: artist.firstName,
            lastName: artist.lastName,
            country: artist.country,
            long: artist.long,
            lat: artist.lat
        })
            .subscribe(data => {
                artistCreated.next(data.artist);
            });

        return artistCreated;
    }

    updateArtist(artist: Artist): Observable<Artist> {
        const artistUpdated = new Subject<Artist>();
        this.http.post<ArtistResponse>(`${serverAddress}/artist/${artist._id}`, {
            firstName: artist.firstName,
            lastName: artist.lastName,
            country: artist.country,
            long: artist.long,
            lat: artist.lat
        })
            .subscribe(data => {
                artistUpdated.next(data.artist);
            });

        return artistUpdated;
    }
}
