import AnimationHello from "@/component/animation/animation";
import { Card, CardContent, CardHeader, Container, Grid, IconButton, Typography } from "@mui/material";


export default function Home() {
  return (
    <div>

      <Grid container spacing={2}>
        <Grid size={12}>
          <Card>
            {/* <AnimationHello /> */}
            <CardHeader title="Welcome to the Home Page" />
            <CardContent>
              <Typography variant="h5" component="div">
                Task
              </Typography>
              <Typography variant="body2">
                This is a sample home page using Material-UI components.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="body2">
                This is a sample home page using Material-UI components.
              </Typography>
              <IconButton>
                
              </IconButton>
              <Grid></Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div >
  );
}