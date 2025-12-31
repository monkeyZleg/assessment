import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
interface Props {
    open: boolean;
    onClose: () => void;
    // onSubmit: (e: any) => void;
}

export default function TaskformDialog(props: Props) {
    const { open, onClose } = props;
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid size={12} display="flex" justifyContent="space-between">
                        <DialogTitle>

                            This is a task form dialog.
                        </DialogTitle>
                        <DialogActions>
                            <IconButton onClick={onClose}>
                                <CloseIcon/>
                            </IconButton>
                        </DialogActions>
                    </Grid>
                    <Grid size={12}>
                        Task form content goes here.
                    </Grid>
                    <Grid>
                        {/* <Button variant="contained" onClick={onSubmit}>
                            Submit
                        </Button> */}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}