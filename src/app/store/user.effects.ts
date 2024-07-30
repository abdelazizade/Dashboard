import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap((action) =>
        this.userService.getUsers(action.page).pipe(
          map((response) => loadUsersSuccess({ response })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap((action) =>
        this.userService.getUser(action.id).pipe(
          map((user) => loadUserSuccess({ user: user.data })),
          catchError((error) => of(loadUserFailure({ error })))
        )
      )
    )
  );
}
