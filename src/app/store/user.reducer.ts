// import { createReducer } from '@ngrx/store';
// import { User } from '../interface/userInterface';

// const initialUser: User = {
//   id: 0,
//   email: '',
//   first_name: '',
//   last_name: '',
//   avatar: '',
// };

// export const userReducer = createReducer(initialUser);
import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.actions';
import { UserState } from '../interface/userInterface';

const initialState: UserState = {
  users: [],
  searchResults: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  //users
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { response }) => ({
    ...state,
    users: response.data,
    currentPage: response.page,
    totalPages: response.total_pages,
    loading: false,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  //user
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    searchResults: [user],
    loading: false,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
