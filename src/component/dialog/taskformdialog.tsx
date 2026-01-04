import { Autocomplete, AutocompleteRenderInputParams, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    cards: TaskCard[];
    setCards: Dispatch<SetStateAction<TaskCard[]>>;
    activeNumberId: number;
    onRemove: () => void;
}

interface FormValues {
    description: string;
    type: string;
    status: string;
}

const schema = yup.object({
    description: yup.string().required("Description is required"),
    type: yup.string().required("Type is required"),
    status: yup.string().required("Status is required"),
});

export default function TaskformDialog(props: Props) {
    const { open, onClose, title, activeNumberId, setCards, cards, onRemove } = props;
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: "",
            type: "",
            status: "",
        },
    });

    useEffect(() => {
        if (open) {
            const card = cards.find((c: any) => c.id === activeNumberId);
            reset({
                description: card?.description || "",
                type: card?.type || "",
                status: card?.status || "",
            });
        }
    }, [open, activeNumberId, cards, reset]);

    const taskStatus = [
        "New",
        "In Progress",
        "Resolved",
        "Closed"
    ]

    const taskType = [
        "New Task",
        "Bug",
        "Improvement",
        "Feature Request",
        "Change Request",
        "Other"
    ]

    const onSubmit = (data: FormValues) => {
        setCards(prev =>
            prev.map(card =>
                card.id === activeNumberId
                    ? { ...card, ...data }
                    : card
            )
        );

        toast.success("Successfully updated task!");
        onClose();
    };

    return (
        <Dialog
            open={open}
            maxWidth="md"
            onClose={(event, reason) => {
                if (reason === "backdropClick") {
                    onClose();
                }
            }}
        >
            <DialogContent>
                <Grid size={12} display="flex" justifyContent="space-between">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogActions>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Grid>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Autocomplete
                                    {...field}
                                    options={taskType}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Autocomplete
                                    {...field}
                                    options={taskStatus}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Status"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Card Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddCommentIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                        <Button color="error" onClick={onRemove}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
