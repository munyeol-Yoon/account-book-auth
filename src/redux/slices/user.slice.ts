import { createSlice } from "@reduxjs/toolkit";

export interface UserType {
  user: {
    id: string;
    nickname: string;
    avatar: string;
    success: boolean;
  };
}

const initialState: UserType = {
  user: {
    id: "",
    nickname: "",
    avatar: "",
    success: true,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
