"use client";
import Tasklist from "@/component/task/tasklist";
import { Grid } from "@mui/material";


export default function Home() {
  return (
    <Grid>
      <Tasklist />
    </Grid>
  );
}