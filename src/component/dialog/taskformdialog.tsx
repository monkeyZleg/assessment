import { Autocomplete, AutocompleteRenderInputParams, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    open: boolean;
    onClose: () => void;
    title: string;
    cards: TaskCard[];
    setCards: Dispatch<SetStateAction<TaskCard[]>>;
    activeNumberId: number;
    onRemove: () => void;
}

export default function TaskformDialog(props: Props) {
    const { open, onClose, title, activeNumberId, setCards, cards, onRemove } = props;
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [formData, setFormData] = useState<any>({});

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

    const handleSubmit = async () => {
        try {
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
            toast.success('Successfully Add Task!');
        } catch (e: any) {
            toast.error('This is an error!');
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
                                renderInput={(params) => <TextField {...params} label="Type" />}
                            />
                        </Grid>

                        <Grid size={6}>
                            <Autocomplete
                                options={taskStatus}
                                fullWidth
                                value={status || cards.find(card => card.id === activeNumberId)?.status || ""}
                                onChange={(event, newValue) => handleChange("status", newValue)}
                                getOptionLabel={(option) => option || ""}
                                renderInput={(params) => <TextField {...params} label="Status" />}
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
                    <Grid>
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