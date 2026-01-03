import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import { useState } from "react";
interface Props {
    open: boolean;
    onClose: () => void;
    setTaskTitle: (title: string) => void;
    taskTitle: string;
    handleAddingCard: (title: string) => void;
}
export default function CardDialog(props: Props) {
    const { open, onClose, taskTitle, setTaskTitle, handleAddingCard } = props;
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: any) => {
        setTaskTitle(e.target.value);
    }

    const cardSchema = yup.object({
        title: yup
            .string()
            .required("Card title is required")
            .min(3, "Title must be at least 3 characters"),
    });

    const onAdd = async () => {
        try {
            await cardSchema.validate(
                { title: taskTitle },
                { abortEarly: false }
            );

            setError(null);
            handleAddingCard(taskTitle);
            onClose();
        } catch (err: any) {
            setError(err.errors[0]);
        }
    };


    return (
        <Dialog open={open} maxWidth={'sm'}>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid size={12} display="flex" justifyContent="space-between">
                        <DialogTitle>
                            Add New Card
                        </DialogTitle>
                        <DialogActions>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                    </Grid>
                    <Grid size={12}>
                        <DialogContent>
                            <Grid size={12}>
                                <TextField
                                    label="Card Title"
                                    value={taskTitle}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!error}
                                    helperText={error}
                                />
                            </Grid>
                        </DialogContent>
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={onAdd}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}