import { CredentialsInterceptor } from './Credentials.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { UserService } from './Services/user.service'
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login.component';
import { LogoutComponent } from './Components/logout.component';
import { RegisterComponent } from './Components/register.component';
import { VideoComponent } from './Components/video.component';

import { SongService } from './Services/song.service'
import { SongsComponent } from './Components/songs.component';
import { SongAddEditDialogComponent } from './Components/songAddEditDialog.component';
import { SongDeleteDialogComponent } from './Components/songDeleteDialog.component';
import { SongDetailDialogComponent } from './Components/songDetailDialog.component';
import { Top10SongsComponent } from './Components/top10songs.component';

import { ArtistService } from './Services/artist.service';
import { ArtistComponent } from './Components/artist.component';
// import { ArtistDetailDialogComponent } from './Components/artistDetailDialog.component';
import { ArtistAddEditDialogComponent } from './Components/artistAddEditDialog.component';
import { ArtistDeleteDialogComponent } from './Components/artistDeleteDialog.component';
import { Top10ArtistsComponent } from './Components/top10artists.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ArtistComponent,
    // ArtistDetailDialogComponent,
    SongsComponent,
    Top10ArtistsComponent,
    Top10SongsComponent,
    SongDetailDialogComponent,
    SongDeleteDialogComponent,
    SongAddEditDialogComponent,
    ArtistAddEditDialogComponent,
    ArtistDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAVvxD7pbVARxYHsfOVXbNAZyXh4eXu_0o",
      libraries: ["places"]
    })
  ],
  providers: [
    UserService,
    ArtistService,
    SongService,
    { provide: MD_DIALOG_DATA, useValue: {} },
    { provide: MdDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SongDetailDialogComponent,
    SongDeleteDialogComponent,
    SongAddEditDialogComponent,
    ArtistAddEditDialogComponent,
    ArtistDeleteDialogComponent
  ]
})
export class AppModule {
}
