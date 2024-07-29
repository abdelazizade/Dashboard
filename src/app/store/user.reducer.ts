import { createReducer } from '@ngrx/store';
import { User } from '../interface/userInterface';

const initialUser: User = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
};

export const userReducer = createReducer(initialUser);
