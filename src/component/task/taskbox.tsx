import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface TaskboxProps {
    onRemove: () => void;
    onOpen?: () => void;
}

export function Taskbox(props: TaskboxProps) {
    const { onRemove, onOpen } = props;

    const handleAddTask = () => {
        console.log("Add task clicked");
    }
    
    return (
        <Card
            onClick={onOpen}
            sx={{
                minWidth: 400,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: "#e4e4e4ff",
                },
            }}
        >
            <CardContent>
                <Grid justifyContent="space-between" display="flex" alignItems="center">
                    <Typography variant="body2">
                        This is a sample task box.
                    </Typography>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                    >
                        <HorizontalRuleIcon />
                    </IconButton>
                </Grid>
            </CardContent>
        </Card>
    );
}
