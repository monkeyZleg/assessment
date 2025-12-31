import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface TaskboxProps {
    onRemove: () => void;
}

export function Taskbox(props: TaskboxProps) {
    const { onRemove } = props;
    return (
        <Grid size={6}>
            <Card>
                <CardContent>
                    <Grid size={6} display="flex" alignItems="center">
                        <Typography variant="body2">
                            This is a sample task box.
                        </Typography>
                        <IconButton onClick={onRemove}>
                            <HorizontalRuleIcon />
                        </IconButton>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}
