import { Component, ElementRef, Inject, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { Artist } from './../Modules/artist';
import { ArtistService } from './../Services/artist.service';
import { SongService } from '../Services/song.service';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
    selector: 'song-edit',
    templateUrl: './../Views/artistAddEditDialog.component.html',
    styleUrls: ['./../CSS/song.component.css'],
    styles: [`
        #google-map-inEdit {
            height: 300px;
        }
    `],
    providers: [SongService]
})

export class ArtistAddEditDialogComponent implements OnInit {
    title: string;
    isCreate: boolean;
    selectedArtist: Artist;

    public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;
    public latitude: number;
    public longitude: number;
    public zoom: number;

    constructor(public dialogRef: MdDialogRef<ArtistAddEditDialogComponent>, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
        @Inject(MD_DIALOG_DATA) public data: any,
        private artistService: ArtistService) {
        this.selectedArtist = data.selectedSong;
        this.isCreate = data.isCreate;
        this.title = this.isCreate ? 'ADD NEW ARTIST' : `EDIT ${this.selectedArtist.firstName} ${this.selectedArtist.lastName}`;
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl();
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.selectedArtist.lat = place.geometry.location.lat();
                    this.selectedArtist.long = place.geometry.location.lng();
                    this.latitude = this.selectedArtist.lat;
                    this.longitude = this.selectedArtist.long;
                });
            });
        });
    }

    private setCurrentPosition() {
        if (this.selectedArtist.lat) {
            this.latitude = this.selectedArtist.lat;
            this.longitude = this.selectedArtist.long;
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
              });
        }
      }

    saveArtist() {
        if (this.isCreate) {
            this.artistService.createArtist(this.selectedArtist).subscribe(() => {
                console.log('created new artist');
                this.dialogRef.close();
            })
        } else {
            this.artistService.updateArtist(this.selectedArtist).subscribe(() => {
                console.log('created new artist');
                this.dialogRef.close();
            })
        }
    }
}