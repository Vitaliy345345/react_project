import { TextField } from '@mui/material';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
    textColor?: string
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            activateBlurMode()
        }
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateBlurMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
        editMode
            ?
            <TextField 
                onChange={onChangeHandler}
                onBlur={activateBlurMode}
                onKeyDown={onKeyDownHandler}
                value={title}
                variant={'standard'}
                color={'success'}
                sx={{ width: '180px' }}
                autoFocus />
            :
            <span  style={{ marginRight: "10px", color: props.textColor, cursor: 'pointer' }} onDoubleClick={activateEditMode} >{props.title}</span>
    );
};

export default EditableSpan;