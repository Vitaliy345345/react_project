import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface DialogSubmitPropsType {
    open: boolean
    onClose: () => void
    removeTodoList: () => void
}

const DialogSubmit = ({ open, onClose, removeTodoList }: DialogSubmitPropsType) => {

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            style: {
                borderRadius: '20px'
            },
        }}>
            <DialogTitle id="alert-dialog-title">
                {"Delete"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the todo list?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ borderRadius: '20px' }} variant='outlined' color='success' onClick={onClose}>Cancel</Button>
                <Button style={{ borderRadius: '20px' }} variant='outlined' color='success' onClick={removeTodoList} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSubmit;