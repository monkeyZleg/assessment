import { Toaster } from "react-hot-toast";

export default function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                success: {
                    style: {
                        background: '#cbf5dd',
                        color: 'black',
                        fontWeight: 'bold',
                    },
                },
                error: {
                    style: {
                        background: '#aa3224ff',
                        color: 'white',
                        fontWeight: 'bold'
                    },
                },
            }}
        />
    );
}