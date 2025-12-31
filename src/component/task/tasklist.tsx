"use client";

import { useState } from "react";
import { Grid, Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Taskbox } from "@/component/task/taskbox";
import TaskformDialog from "./taskformdialog";


export default function Tasklist() {
    const [tasks, setTasks] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const [taskType, setTaskType] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskStartDate, setTaskStartDate] = useState<string>('');
    const [taskEndDate, setTaskEndDate] = useState<string>('');

    const tasksType = [
        'Shopping',
        'Work',
        'Personal',
        'Others'
    ];

    const handleAddTask = () => {
        // setTasks((prev) => [...prev, prev.length]);
        setOpen(true);
    };

    const handleRemoveTask = (index: number) => {
        const newTasks = [];

        for (let i = 0; i < tasks.length; i++) {
            if (i !== index) {
                newTasks.push(tasks[i]);
            }
        }

        setTasks(newTasks);
        console.log(newTasks, 'number', index);
    };

    const onSubmit = (e: any) => {
        // Handle form submission logic here
        console.log('Task Type:', taskType);
    }

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Grid size={12}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Grid size={6} display="flex" alignItems="center">
                                <Typography variant="body2">
                                    This is a sample home page using Material-UI components.
                                </Typography>

                                <IconButton onClick={handleAddTask}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {tasks.map((_, index) => (
                <Taskbox
                    key={index}
                    onRemove={() => handleRemoveTask(index)}
                />
            ))}
            <TaskformDialog 
                open={open}
                onClose={() => setOpen(false)} 
                onSubmit={(e) => onSubmit(e)}
            />
        </Grid>
    );
}
