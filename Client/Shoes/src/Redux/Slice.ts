import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for the state
interface UserState {
  user: User | null;
  isAdmin: boolean;
}

// Define the type for the user object (adjust the fields according to your needs)
interface User {
  id: string;
  name: string;
  email: string;
  
}

// Get the initial state from localStorage with proper types
const initialState: UserState = {
  user: (() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? (JSON.parse(storedUser) as User) : null;
    } catch {
      return null;
    }
  })(),
  
  isAdmin: (() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    try {
      return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
    } catch {
      return false;
    }
  })(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define type for setUser action using PayloadAction
    setUser: (state, action: PayloadAction<User>) => {
        console.log(action.payload)
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
      localStorage.setItem('isAdmin', JSON.stringify(action.payload));
    },
  },
});

export const { setUser, clearUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;
