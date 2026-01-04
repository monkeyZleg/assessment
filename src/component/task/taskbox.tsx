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

    const statusAccent = (status?: string) => {
        switch (status) {
            case "New":
                return "#4caf50";
            case "In Progress":
                return "#0288d1";
            case "Resolved":
                return "#9c27b0";
            case "Closed":
                return "#d32f2f";
            default:
                return "#bdbdbd";
        }
    };

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
                display: "flex",
                height: "fit-content",
                borderLeft: `6px solid ${statusAccent(status)}`,
                transition: "all 0.25s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    backgroundColor: "#f9f9f9ff",
                },
            }}
        >
            <CardContent sx={{ width: "100%" }}>
                <Grid container spacing={2}>

                    <Grid size={12} display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={600}>
                            {taskTitle}
                        </Typography>

                        <Grid display="flex" gap={1} alignItems="center">
                            {statusColor(status)}
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                            >
                                <HorizontalRuleIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid mt={1} size={12}>
                        {typeColor(type)}
                    </Grid>

                    {description && (
                        <Grid size={12} sx={{ background: '#e4e3e3ff', padding: '5px', borderRadius: '5px' }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {description}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>

    );
}
