import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  id: number;
};

type UserEvent = {
  title: string;
  id: number;
};

export interface CounterState {
  userData: UserType & { isLoggedIn: boolean; userEvents: UserEvent[] };
  isAdmin: boolean;
}

const initialState: CounterState = {
  userData: JSON.parse(localStorage.getItem("userData")!) || {
    userEvents: [],
  },
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")!) || false,
};

export const appStateSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.userData.isLoggedIn = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    toggleSubscribeEventForUser: (state, action: PayloadAction<{ title: string; id: number }>) => {
      if (state.userData.userEvents.find((event) => event.id === action.payload.id)) {
        state.userData.userEvents = state.userData.userEvents.filter(
          (event) => event.id !== action.payload.id
        );
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...state.userData,
            userEvents: state.userData.userEvents.filter((event) => event.id !== action.payload.id),
          })
        );
      } else {
        state.userData.userEvents.push({ title: action.payload.title, id: action.payload.id });
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...state.userData,
            userEvents: state.userData.userEvents.filter((event) => event.id !== action.payload.id),
          })
        );
      }
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, toggleSubscribeEventForUser, setUserData, setAdmin } =
  appStateSlice.actions;

export default appStateSlice.reducer;
