"use client";
import Tasklist from "@/component/task/tasklist";
import { Card, CardContent, CardHeader, Container, Grid, IconButton, Typography } from "@mui/material";


export default function Home() {
  return (
    // <div>
    <Grid container spacing={2}>
      <Grid size={12}>
        <Card>
          <CardHeader title="Welcome to the Home Page" />
          <CardContent>
            <Typography variant="h5" component="div">
              Task
            </Typography>
            <Typography variant="body2">
              This is a sample home page using Material-UI components.
            </Typography>
          </CardContent>
          <CardContent>
            <Tasklist />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // </div >
  );
}