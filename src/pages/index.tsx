import React from "react";
import MoviesList from "@/entities/movies";
import { useLoadLSDataToStore } from "@/shared/lib/hooks/useLoadLSDataToStore";
import { loadFavouritesMovies } from "@/entities/movies/model";
import { LSKeys } from "@/shared/lib/constants/enums";

export default function Movies() {
  useLoadLSDataToStore<typeof loadFavouritesMovies>(
    LSKeys.FAVOURITES,
    loadFavouritesMovies
  );
  return <MoviesList />;
}
