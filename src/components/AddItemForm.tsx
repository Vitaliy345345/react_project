import { Add, CheckCircle, Done, DoneAll } from '@mui/icons-material';
import { IconButton, TextField, TextFieldVariants } from '@mui/material';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { lightGreen } from '../constants';

type AddItemFormPropsType = {
    createItem: (newTitle: string) => void
    title: string
    variant: TextFieldVariants
    disabled?: boolean
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const {disabled} = props
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onCreateTaskClickHandler()
        }
    }

    const onCreateTaskClickHandler = () => {
        if (newTitle.trim() !== '') {
            props.createItem(newTitle)
            setNewTitle('')
        }
        else {
            setError('Title is required')
            return
        }
    }
    return (
        <div style={{ height: '56px' }}>
            <TextField
                sx={{ mr: '20px' }}
                size={'medium'}
                fullWidth
                color='success'
                value={newTitle}
                label={props.title}
                variant={props.variant}
                onChange={onChangeHandler}
                onKeyDown={onKeyUpHandler}
                error={!!error}
                helperText={error}
                disabled={disabled}
            />
            <IconButton
                onClick={onCreateTaskClickHandler}
                color='success'
                disabled={disabled}
                style={{ position: 'relative', left: '248px', top: '-52px' }}
            >
                <Done sx={{ fontSize: 30 }} />
            </IconButton>
        </div>
    );
};

export default AddItemForm;