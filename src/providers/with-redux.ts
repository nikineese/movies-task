import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer, moviesSlice } from "@/entities/movies/model/slice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [moviesSlice.name]: moviesReducer,
    },
  });
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
