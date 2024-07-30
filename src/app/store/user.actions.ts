import { createAction, props } from '@ngrx/store';
import { UsersData } from '../interface/userInterface';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page: number }>()
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: UsersData }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const loadUser = createAction(
  '[User] Load User',
  props<{ id: number }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: any }>()
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
