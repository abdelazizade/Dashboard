export interface UserState {
  users: User[];
  searchResults: User[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: any;
}
export interface UsersData {
  data: User[];
  page: number;
  total_pages: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserDetails {
  data: User[];
  support: {
    url: string;
    text: string;
  };
}
