import { configureStore } from "@reduxjs/toolkit";
import accountBookReducer from "./slices/accountBook.slice";
import monthReducer from "./slices/month.slice";
import userReducer from "./slices/user.slice";

const store = configureStore({
  reducer: {
    accountBook: accountBookReducer,
    month: monthReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
