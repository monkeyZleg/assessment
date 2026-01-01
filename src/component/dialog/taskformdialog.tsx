import { Autocomplete, AutocompleteRenderInputParams, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCommentIcon from '@mui/icons-material/AddComment';
interface Props {
    open: boolean;
    onClose: () => void;
    taskTitle: string;
    taskDescription: string;
    setTaskDescription: (description: string) => void;
}

export default function TaskformDialog(props: Props) {
    const { open, onClose, taskTitle, taskDescription, setTaskDescription } = props;

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
        // if (e.target.value =)
        console.log(e.target.value);
    }

    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogContent>
                <Grid size={12} display="flex" justifyContent="space-between">
                    <DialogTitle>
                        {taskTitle}
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
                                renderInput={(params) => <TextField {...params} label="Type" />}
                                onChange={(e) => handleChange("type", e)}
                            >
                            </Autocomplete>
                        </Grid>
                        <Grid size={6}>
                            <Autocomplete
                                options={taskStatus}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Status" />}
                                onChange={(e) => handleChange("status", e)}
                            >
                            </Autocomplete>
                        </Grid>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Card Description"
                            // value={taskTitle}
                            value={taskDescription}
                            onChange={(e) => handleChange("description", e)}
                            fullWidth
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
                        {/* <Button variant="contained" onClick={onSubmit}>
                            Submit
                        </Button> */}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog >
    )
}