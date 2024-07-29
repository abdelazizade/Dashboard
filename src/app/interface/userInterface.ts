export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support: {
    url: string;
    text: string;
  };
}

export interface UserDetails {
  data: User[];
  support: {
    url: string;
    text: string;
  };
}
