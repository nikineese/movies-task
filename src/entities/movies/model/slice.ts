import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { MovieApiQuery, MovieCardResponse } from "./types";
import { useSelector } from "react-redux";
import { AppState } from "@/providers";
import { isArraysHasEqualElem } from "@/shared/lib/helpers";
import { LSKeys } from "@/shared/lib/constants/enums";

export const initialState: {
  data: MovieCardResponse[];
  error: string;
  query: MovieApiQuery;
  favourites: MovieCardResponse[];
} = {
  data: [],
  error: "",
  query: {
    search: "",
    page: 1,
  },
  favourites: [],
};
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, { payload }: PayloadAction<MovieCardResponse[]>) => {
      state.data = payload;
    },
    addMoviesPage: (state, { payload }: PayloadAction<MovieCardResponse[]>) => {
      state.data = isArraysHasEqualElem<MovieCardResponse>(
        payload,
        state.data,
        "imdbID"
      )
        ? state.data
        : state.data.concat(payload);
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setQuery: (state, { payload }: PayloadAction<MovieApiQuery>) => {
      state.query = payload;
    },
    loadFavourites: (
      state,
      { payload }: PayloadAction<MovieCardResponse[]>
    ) => {
      state.favourites = payload;
    },
    addFavourite: (state, { payload }: PayloadAction<MovieCardResponse>) => {
      state.favourites = !state.favourites.some(
        (el) => el.imdbID === payload.imdbID
      )
        ? state.favourites.concat(payload)
        : state.favourites;
      localStorage.setItem(LSKeys.FAVOURITES, JSON.stringify(state.favourites));
    },
    removeFavourite: (state, { payload }: PayloadAction<MovieCardResponse>) => {
      state.favourites = state.favourites.filter(
        (el) => el.imdbID !== payload.imdbID
      );
      localStorage.setItem(LSKeys.FAVOURITES, JSON.stringify(state.favourites));
    },
  },
});

export const setMoviesData = (data: MovieCardResponse[], dispatch: Dispatch) =>
  dispatch(moviesSlice.actions.setMovies(data));
export const addMoviesPageData = (
  data: MovieCardResponse[],
  dispatch: Dispatch
) => {
  dispatch(moviesSlice.actions.addMoviesPage(data));
};
export const setMoviesError = (error: string, dispatch: Dispatch) =>
  dispatch(moviesSlice.actions.setError(error));
export const setMoviesQuery = (query: MovieApiQuery, dispatch: Dispatch) =>
  dispatch(moviesSlice.actions.setQuery(query));
export const addFavouriteMovie = (
  data: MovieCardResponse,
  dispatch: Dispatch
) => dispatch(moviesSlice.actions.addFavourite(data));
export const removeFavouriteMovie = (
  data: MovieCardResponse,
  dispatch: Dispatch
) => dispatch(moviesSlice.actions.removeFavourite(data));
export const loadFavouritesMovies = (
  data: MovieCardResponse[],
  dispatch: Dispatch
) => dispatch(moviesSlice.actions.loadFavourites(data));

export const useGetMovies = () =>
  useSelector((state: AppState) => state.movies.data);
export const useGetError = () =>
  useSelector((state: AppState) => state.movies.error);
export const useGetQuery = () =>
  useSelector((state: AppState) => state.movies.query);
export const useGetFavourites = () =>
  useSelector((state: AppState) => state.movies.favourites);

export const moviesReducer = moviesSlice.reducer;
