import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
interface Props {
    open: boolean;
    onClose: () => void;
    handleAddingCard: (title: string) => void;
}
interface FormValues {
    title: string;
}

export default function CardDialog(props: Props) {
    const { open, onClose, handleAddingCard } = props;
    const [error, setError] = useState<string | null>(null);

    const cardSchema = yup.object({
        title: yup
            .string()
            .required("Card title is required")
            .min(3, "Title must be at least 3 characters"),
    });

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(cardSchema),
        defaultValues: { title: "" },
    });

    const onAdd = async (data: FormValues) => {
        try {
            setError(null);
            handleAddingCard(data.title);
            onClose();
            reset();
        } catch (err: any) {
            setError(err.errors[0]);
        }
    };


    return (
        <Dialog
            open={open}
            maxWidth={'sm'}
            onClose={(event, reason) => {
                if (reason === "backdropClick") {
                    onClose();
                }
            }}
        >
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

                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        // <TextField
                                        // label="Card Title"
                                        // fullWidth
                                        // error={!!fieldState.error}
                                        // helperText={fieldState.error?.message}
                                        // />
                                        <TextField
                                            {...field}
                                            label="Card Title"
                                            fullWidth
                                            error={!!error}
                                            helperText={error}
                                        />
                                    )}
                                />
                            </Grid>
                        </DialogContent>
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSubmit(onAdd)}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}