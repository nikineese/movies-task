import React, { useCallback, useState } from "react";
import { BASE_API_URL } from "@/shared/config";
import Head from "next/head";
import {
  Alert,
  Badge,
  Box,
  Button,
  Input,
  Snackbar,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MovieCard } from "./movie-card";
import {
  addMoviesPageData,
  MovieCardResponse,
  setMoviesData,
  setMoviesError,
  setMoviesQuery,
  useGetError,
  useGetFavourites,
  useGetMovies,
  useGetQuery,
} from "@/entities/movies/model";
import { useDispatch } from "react-redux";
import { mapListWithEmptyPlaceholder } from "../lib/helpers";

const MoviesList = () => {
  const movies = useGetMovies();
  const error = useGetError();
  const query = useGetQuery();
  const favourites = useGetFavourites();

  const [savedSearch, setSavedSearch] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  const dispatch = useDispatch();
  const onClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setMoviesError("", dispatch);
  };

  const onFetchMovies = useCallback(
    async (page?: number) => {
      const response = await fetch(
        `${BASE_API_URL}&s=${page ? savedSearch : query.search}&page=${
          page || 1
        }`
      );
      const { Search: search }: { Search: any[] } = await response.json();
      if (search?.length && page) {
        addMoviesPageData(search, dispatch);
        return;
      }
      if (search?.length) {
        setShowFavourites(false);
        setMoviesData(search, dispatch);
        setSavedSearch(query.search);
        return;
      }
      setMoviesError("Movies not found", dispatch);
    },
    [query, savedSearch]
  );

  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="Movies page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        marginTop="10px"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography paddingTop="5px" variant="h4" component="div">
                Movies
              </Typography>
              <Button onClick={() => setShowFavourites(!showFavourites)}>
                <Badge badgeContent={favourites.length} color="primary">
                  {showFavourites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Badge>
              </Button>
            </Box>
            <Box display="flex" gap="15px">
              <Input
                type="text"
                onChange={(e) => {
                  setMoviesError("", dispatch);
                  setMoviesQuery(
                    { ...query, search: e.target.value },
                    dispatch
                  );
                }}
              />
              <Button onClick={() => onFetchMovies()}>Search</Button>
            </Box>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            gap="15px"
            margin="5px"
            justifyContent="center"
          >
            {mapListWithEmptyPlaceholder<MovieCardResponse>(
              showFavourites ? favourites : movies,
              (el) => (
                <MovieCard key={el.imdbID} data={el} />
              )
            )}
          </Box>
        </Box>
        {!showFavourites && movies.length > 0 && (
          <Button
            onClick={() => {
              onFetchMovies(query.page + 1);
              setMoviesQuery({ ...query, page: query.page + 1 }, dispatch);
            }}
          >
            Load more
          </Button>
        )}
        <Snackbar
          open={error.length > 0}
          autoHideDuration={6000}
          onClose={onClose}
        >
          <Alert onClose={onClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default MoviesList;
