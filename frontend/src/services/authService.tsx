import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/'; // Replace with your backend URL

interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  commonLinks: any[];
  jobIds: any[];
  authorities: { authority: string }[];
  userId: {
    timestamp: number;
    date: string;
  };
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  accessToken?: string;
}

interface AuthResponse {
  user: User;
  jwt: string;
}

const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(API_URL + 'login', { username, password }, { withCredentials: true });
  if (response.data.jwt) {
    const user = {
      ...response.data.user,
      accessToken: response.data.jwt
    
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem('user');
};

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) as User : null;
};

export default {
  login,
  logout,
  getCurrentUser
};
