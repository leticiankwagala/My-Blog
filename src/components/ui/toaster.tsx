type ToastHandler = (title: string, description?: string) => void;

export const toasts: {
    success: ToastHandler;
    error: ToastHandler;
} = {
    success: (title, description) => {
        console.info(title, description);
    },
    error: (title, description) => {
        console.error(title, description);
    },
};
