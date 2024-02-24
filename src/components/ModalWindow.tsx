import { Button, Menu } from '@mui/material';
import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import '../styles/modal.css'
import AddItemForm from './AddItemForm';
import DatePickerComponent from './DatePickerComponent';
import dayjs, { Dayjs } from 'dayjs';
import ColorPicker from './ColorPicker';

interface ModalWindowPropsType {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    openModal: boolean
    createTodoList: (title: string) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    setTodoDate: React.Dispatch<React.SetStateAction<Date | null>>
    todoDate: Date | null
}

const ModalWindow = ({ openModal,
    setOpenModal,
    createTodoList,
    color,
    setColor,
    setTodoDate,
    todoDate,
}: ModalWindowPropsType) => {
    return (
        <div className={openModal ? 'modal active' : 'modal'} onClick={() => setOpenModal(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h2>Create notation</h2>
                <div>
                    <AddItemForm
                        title='Title'
                        variant='outlined'
                        createItem={createTodoList}
                    />
                    <ColorPicker color={color} setColor={setColor} textColor='black' />
                    <DatePickerComponent todoDate={todoDate} setTodoDate={setTodoDate} />
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;