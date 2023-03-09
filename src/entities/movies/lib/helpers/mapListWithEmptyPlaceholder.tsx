import { Typography } from "@mui/material";

export function mapListWithEmptyPlaceholder<T>(
  list: T[],
  mapper: (el: T, idx: number, arr: T[]) => JSX.Element
) {
  if (list.length === 0)
    return (
      <Typography variant="h4" marginTop="20px" component="div">
        Data is empty
      </Typography>
    );
  return list.map(mapper);
}
