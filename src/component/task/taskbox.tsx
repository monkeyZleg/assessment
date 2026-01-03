import { Grid, Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface TaskboxProps {
    onRemove: () => void;
    onOpen?: () => void;
    taskTitle?: string;
    description?: string;
    type?: string;
    status?: string;
}

export function Taskbox(props: TaskboxProps) {
    const { onRemove, onOpen, taskTitle, description, type, status } = props;

    
    const statusColor = (status: string | undefined) => {
        switch (status) {
            case "New":
                return (
                    <Chip label="New" color="success" />
                );
            case "In Progress":
                return (
                    <Chip label="In Progress" color="info" />
                );
            case "Resolved":
                return (
                    <Chip label="Resolved" color="secondary" />
                );
            case "Closed":
                return (
                    <Chip label="Closed" color="error" />
                );
            default:
                return null;
        }
    }

    const typeColor = (type: string | undefined) => {
        switch (type) {
            case "New Task":
                return (
                    <Chip label="New Task" color="primary" />
                );
            case "Bug":
                return (
                    <Chip label="Bug" color="error" />
                );
            case "Improvement":
                return (
                    <Chip label="Improvement" color="warning" />
                );
            case "Feature Request":
                return (
                    <Chip label="Feature Request" color="primary" />
                );
            case "Change Request":
                return (
                    <Chip label="Change Request" color="info" />
                );
            case "Other":
                return (
                    <Chip label="Other" color="default" />
                );
            default:
                return null;
        }
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
                height: "fit-content",
            }}
        >
            <CardContent>
                <Grid display="flex" alignItems="center">
                    <Grid>
                        <Typography variant="body2">
                            {taskTitle}
                        </Typography>

                    </Grid>
                    <Grid>
                        {statusColor(status)}
                    </Grid>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                    >
                        <HorizontalRuleIcon />
                    </IconButton>
                </Grid>
                <Grid>
                    <Grid>
                        <Typography variant="body2">
                            {typeColor(type)}
                        </Typography>
                    </Grid>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
}
