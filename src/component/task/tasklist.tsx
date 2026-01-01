import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Stack, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Taskbox } from "@/component/task/taskbox";
import TaskformDialog from "../dialog/taskformdialog";
import CardDialog from "../dialog/cardDialog";

export default function Tasklist() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [tasksIndex, setTasksIndex] = useState<number[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const list = [];
    const [taskOpen, setTaskOpen] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    

    useEffect(() => {

    }, []);

    const handleOpenCardDialog = (e: any) => {
        setTaskOpen(true);
    };

    const handleAddingCard = async () => {
        try {
            setTasksIndex((prev) => [...prev, prev.length]);
            setTaskOpen(false);
        } catch (error) {
            throw error;
        }
    }

    const handleRemoveCard = (index: number) => {
        const newTasks = [];

        for (let i = 0; i < tasksIndex.length; i++) {
            if (i !== index) {
                newTasks.push(tasksIndex[i]);
            }
        }

        setTasksIndex(newTasks);
        console.log(newTasks, 'number', index);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    }

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Card sx={{ mb: 2 }}>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body2">
                        This is a sample home page using Material-UI components.
                    </Typography>

                    <Button onClick={handleOpenCardDialog} variant="contained" color="primary">
                        <Grid display="flex" alignItems="center" gap={1}>
                            <Typography>
                                Add Task
                            </Typography>
                            <AddIcon />
                        </Grid>
                    </Button>
                </CardContent>
            </Card>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    py: 1,
                }}
            >
                <Stack direction="row" spacing={2}>
                    {tasksIndex.map((_, index) => (
                        <Taskbox
                            key={index}
                            onOpen={handleOpenDialog}
                            onRemove={() => handleRemoveCard(index)}
                            taskTitle={taskTitle}
                        />
                    ))}
                </Stack>
            </Box>
            <CardDialog
                open={taskOpen}
                onClose={() => setTaskOpen(false)}
                setTaskTitle={setTaskTitle}
                taskTitle={taskTitle}
                handleAddingCard={handleAddingCard}
            />
            <TaskformDialog
                open={open}
                onClose={() => setOpen(false)}
                taskTitle={taskTitle}
                setTaskDescription={setTaskDescription}
                taskDescription={taskDescription}
            />
        </Box>
    );
}
