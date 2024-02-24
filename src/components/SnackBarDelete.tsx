import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface SnackBarDeletePropsType {
    open: boolean
    onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
    todoTitle: string | null
}

const SnackBarDelete = ({open, onClose, todoTitle}: SnackBarDeletePropsType) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                "{todoTitle}" successfully deleted!
            </Alert>
        </Snackbar>
    );
};

export default SnackBarDelete;