import { Box, Rating, Typography } from "@mui/material";
import { BASE_API_URL } from "@/shared/config";
import Image from "next/image";
import { MoviePageParams } from "@/pages/movie/types";
import React from "react";
import Head from "next/head";
import { imagePlaceholder } from "@/shared/lib/constants";

const MoviePage: React.FC<MoviePageParams> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.Title}</title>
      </Head>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box display="flex" alignItems="flex-start" gap="50px">
          <Image
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            width={600}
            height={800}
            src={data.Poster !== "N/A" ? data.Poster : imagePlaceholder}
            alt={data.Title}
          />
          <Box
            maxWidth="800px"
            paddingTop="20px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Box display="flex" alignItems="flex-end" gap="10px">
              <Typography variant="h4">{data.Title}</Typography>
              <Typography variant="body1">{data.Year}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap="5px">
              <Box display="flex" gap="5px">
                {data.Genre.split(",").map((el) => (
                  <Typography
                    padding="5px 10px"
                    border="1px solid gray"
                    width="fit-content"
                    borderRadius="10px"
                    component="span"
                    key={el}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
              <Typography>Director: {data.Director}</Typography>
            </Box>
            <Box>
              <Rating
                name="read-only"
                value={Number(data.imdbRating) / 2}
                readOnly
              />
              <Typography component="span" margin="10px 0">
                {" "}
                IMDB: {data.imdbRating}{" "}
              </Typography>
            </Box>
            <Typography variant="h6">{data.Actors}</Typography>
            <Typography variant="h5">{data.Plot}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export async function getServerSideProps({ query }: any) {
  const res = await fetch(`${BASE_API_URL}&i=${query.id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default MoviePage;
