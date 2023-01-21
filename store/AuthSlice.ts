import { createSlice } from "@reduxjs/toolkit";
interface AuthState {
  email: string;
  userName: string;
  id: string;
  photoUrl: string;
}

const initialState: AuthState = {
  email: "",
  userName: "",
  id: "",
  photoUrl: "",
};

export const AuthSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: action.payload.email,
          userName: action.payload.userName,
          id: action.payload.id,
          photoUrl: action.payload.photoUrl,
        })
      );
    },
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
