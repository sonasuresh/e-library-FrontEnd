import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { LoginComponent } from './login/login.component';
import { LedgerComponent } from './ledger/ledger.component';
import { LibraryComponent } from './library/library.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { CreatebookComponent } from './createbook/createbook.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path: 'viewbook', component: ViewbookComponent },
  {path:"library",component:LibraryComponent},
  {path:"users",component:UsersComponent},
  {path:"registeruser",component:CreateuserComponent},
  {path:"request",component:BookrequestComponent},
  {path:"history",component:LedgerComponent},
  {path:"profile",component:ProfileComponent},
  {path:"createbook",component:CreatebookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
