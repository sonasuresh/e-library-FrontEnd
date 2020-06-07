import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BooksComponent } from './books/books.component';
import { UsersComponent } from './users/users.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { LoginComponent } from './login/login.component';
import { LedgerComponent } from './ledger/ledger.component';
import { LibraryComponent } from './library/library.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatebookComponent } from './createbook/createbook.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    UsersComponent,
    CreateuserComponent,
    BookrequestComponent,
    LoginComponent,
    LedgerComponent,
    LibraryComponent,
    ViewbookComponent,
    ProfileComponent,
    CreatebookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    TagInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
