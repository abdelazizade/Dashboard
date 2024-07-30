import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HoverDirective } from './directives/hover.directive';
import { userReducer } from './store/user.reducer';
import { AsyncPipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    LoaderComponent,
    HoverDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      usersState: userReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
    AsyncPipe,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
