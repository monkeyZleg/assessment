import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onAdding: (title: string) => void;
}
export default function CardDialog(props: Props) {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const { open, onClose, onAdding } = props;

    const handleChange = (e: any) => {
        setTaskTitle(e.target.value);
        console.log(e.target.value, 'title');
    }

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
                                />
                            </Grid>
                        </DialogContent>
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="flex-end">
                        <Button variant="contained" >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}