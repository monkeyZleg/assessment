import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Stack, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Taskbox } from "@/component/task/taskbox";
import TaskformDialog from "../dialog/taskformdialog";
import CardDialog from "../dialog/cardDialog";
import toast from "react-hot-toast";
import Toast from "@/global/Toast";

export default function Tasklist() {
    const [cards, setCards] = useState<TaskCard[]>([]);
    const [openCardId, setOpenCardId] = useState<number | null>(null);
    const [taskOpen, setTaskOpen] = useState<boolean>(false);

    const handleOpenCardDialog = (e: any) => {
        setTaskOpen(true);
    };

    const handleAddingCard = async (title: string) => {
        try {
            setCards((prev) => [
                ...prev,
                {
                    id: Date.now(), // unique id
                    title: title,
                },
            ]);
            toast.success("Successfully Add Card")
            setTaskOpen(false);
        } catch (e: any) {
            toast.error("Error")
            throw e;
        }

    };


    const handleRemoveCard = async (id: number) => {
        try {
            setCards((prev) => prev.filter((card) => card.id !== id));
            toast.success('Successfully Delete!');
        } catch (e: any) {
            toast.error("Error");
            throw e;
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Card >
                        <CardContent
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body2">
                                This is a sample home page task management
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
                </Grid>
                <Grid size={12}>
                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            height: "85vh",
                        }}
                    >
                        <Box>
                            <Stack direction="row" spacing={2}>
                                {cards.map((card) => (
                                    <Taskbox
                                        key={card.id}
                                        taskTitle={card.title}
                                        description={card.description}
                                        type={card.type}
                                        status={card.status}
                                        onOpen={() => setOpenCardId(card.id)}
                                        onRemove={() => handleRemoveCard(card.id)}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
                <CardDialog
                    open={taskOpen}
                    onClose={() => setTaskOpen(false)}
                    handleAddingCard={handleAddingCard}
                />
                {cards.map((card) => (
                    <TaskformDialog
                        key={card.id}
                        open={openCardId === card.id}
                        onClose={() => setOpenCardId(null)}
                        title={card.title}
                        setCards={setCards}
                        cards={cards}
                        activeNumberId={card.id}
                        onRemove={() => handleRemoveCard(card.id)}
                    />
                ))}
                <Toast />
            </Grid>
        </>
    );
}
