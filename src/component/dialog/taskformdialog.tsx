import { Autocomplete, AutocompleteRenderInputParams, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    cards: TaskCard[];
    setCards: Dispatch<SetStateAction<TaskCard[]>>;
    activeNumberId: number;
    onRemove: () => void;
}

interface FormErrors {
    description?: string;
    type?: string;
    status?: string;
}

export default function TaskformDialog(props: Props) {
    const { open, onClose, title, activeNumberId, setCards, cards, onRemove } = props;
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (open) {
            const card = cards.find(card => card.id === activeNumberId);

            setDescription(card?.description || "");
            setType(card?.type || "");
            setStatus(card?.status || "");

            setFormData({
                description: card?.description || "",
                type: card?.type || "",
                status: card?.status || "",
            });
        }
    }, [open, activeNumberId, cards]);

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

    const handleChange = (name: string, e: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: e
        }));
        if (name === "description") {
            setDescription(e);
        }
        if (name === "type") {
            setType(e);
        }
        if (name === "status") {
            setStatus(e);
        }
    }

    const cardSchema = yup.object({
        description: yup
            .string()
            .required("Description is required"),

        type: yup
            .string()
            .required("Type is required"),

        status: yup
            .string()
            .required("Status is required"),
    });

    const handleSubmit = async () => {
        try {
            setErrors({});

            await cardSchema.validate(
                {
                    title,
                    description: formData.description,
                    type: formData.type,
                    status: formData.status,
                },
                { abortEarly: false }
            );

            setCards((prevCards: any) =>
                prevCards.map((card: any) =>
                    card.id === activeNumberId
                        ? {
                            ...card,
                            description: formData.description,
                            type: formData.type,
                            status: formData.status,
                        }
                        : card
                )
            );

            onClose();
            toast.success("Successfully updated task!");
        } catch (e: any) {
            if (e.name === "ValidationError") {
                const fieldErrors: FormErrors = {};

                e.inner.forEach((err: any) => {
                    if (err.path) {
                        fieldErrors[err.path as keyof FormErrors] = err.message;
                    }
                });

                setErrors(fieldErrors);
            } else {
                toast.error(e.message || "Unexpected error");
            }
        }

    }


    const handleDelete = () => {
        try {
            onRemove();
        } catch (e: any) {
            toast.error('This is an error!');
        }
    }

    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogContent>
                <Grid size={12} display="flex" justifyContent="space-between">
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogActions>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                </Grid>
                <Grid container spacing={2}>
                    <Grid size={12} container spacing={2}>
                        <Grid size={6}>
                            <Autocomplete
                                options={taskType}
                                fullWidth
                                value={type || cards.find(card => card.id === activeNumberId)?.type || ""}
                                onChange={(event, newValue) => handleChange("type", newValue)}
                                getOptionLabel={(option) => option || ""}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Status"
                                        error={errors.type ? true : false}
                                        helperText={errors.type ? 'Please select a type' : null}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={6}>
                            <Autocomplete
                                options={taskStatus}
                                fullWidth
                                value={status || cards.find(card => card.id === activeNumberId)?.status || ""}
                                onChange={(event, newValue) => handleChange("status", newValue)}
                                getOptionLabel={(option) => option || ""}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Status"
                                        error={errors.status ? true : false}
                                        helperText={errors.status ? 'Please select a status' : null}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Card Description"
                            value={description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            error={errors.description ? true : false}
                            helperText={errors.description ? 'Please add description before submit' : null}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddCommentIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={handleDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog >
    )
}