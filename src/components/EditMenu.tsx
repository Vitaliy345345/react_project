import { Button, Menu, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { darkGray } from '../constants';
import ColorPicker from './ColorPicker';
import DatePickerComponent from './DatePickerComponent';

interface EditMenuPropsType {
    open: boolean
    anchorEl: HTMLElement | null
    onClose: () => void
    title: string
    onChange: (title: string, color: string, newTodoDate: Date) => void
    color: string
    time: Date | null
}

const EditMenu = ({ open, onClose, anchorEl, title, onChange, color, time }: EditMenuPropsType) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [newColor, setNewColor] = useState<string>('')
    const [newTodoDate, setNewTodoDate] = useState<Date | null>(null)

    useEffect(() => {
        setNewTitle(title)
        setNewColor(color)
        setNewTodoDate(time)
    }, [open])

    const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value)
    }
    const onClickConfirmHandler = () => {
        if(newTodoDate){
            onChange(newTitle, newColor, newTodoDate)
        }
        onClose()
    }
    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            PaperProps={{
                style: {
                    backgroundColor: `${darkGray}`,
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', gap: '10px' }}>
                <Typography color='white'>
                    Edit
                </Typography>
                <TextField
                    variant='filled'
                    color='success'
                    label='title'
                    inputProps={{ style: { color: "white" } }}
                    value={newTitle}
                    onChange={onChangeTitleHandler}
                />
                <ColorPicker color={newColor} setColor={setNewColor} textColor='white'/>
                <DatePickerComponent todoDate={newTodoDate} setTodoDate={setNewTodoDate} />
                <Button
                    variant='contained'
                    color='success'
                    onClick={onClickConfirmHandler}
                    fullWidth
                >
                    Confirm
                </Button>
            </div>
        </Menu>
    );
};

export default EditMenu;