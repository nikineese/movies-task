import React from "react";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import {
  addFavouriteMovie,
  MovieCardParams,
  removeFavouriteMovie,
  useGetFavourites,
} from "@/entities/movies/model";
import {
  MovieCardMedia,
  MovieCardWrapper,
} from "@/entities/movies/ui/movie-card/styled";
import Link from "next/link";
import { imagePlaceholder } from "@/shared/lib/constants";
import { useDispatch } from "react-redux";
export const MovieCard: React.FC<MovieCardParams> = ({ data }) => {
  const dispatch = useDispatch();
  const favourites = useGetFavourites();

  return (
    <MovieCardWrapper>
      <MovieCardMedia
        image={data.Poster !== "N/A" ? data.Poster : imagePlaceholder}
        title={data.Title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link target="_blank" href={`/movie?id=${data.imdbID}`}>
            Learn More
          </Link>
        </Button>
        {favourites.some((el) => el.imdbID === data.imdbID) ? (
          <Button onClick={() => removeFavouriteMovie(data, dispatch)}>
            Remove from favourites
          </Button>
        ) : (
          <Button onClick={() => addFavouriteMovie(data, dispatch)}>
            Add to favourites
          </Button>
        )}
      </CardActions>
    </MovieCardWrapper>
  );
};
