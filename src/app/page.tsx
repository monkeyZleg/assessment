"use client";
import Tasklist from "@/component/task/tasklist";
import { Card, CardContent, CardHeader, Container, Grid, IconButton, Typography } from "@mui/material";


export default function Home() {
  return (
    <>
      {/* <Grid container spacing={2}> */}
        <Grid>
          <Tasklist />
        </Grid>
      {/* </Grid> */}
    </>
  );
}