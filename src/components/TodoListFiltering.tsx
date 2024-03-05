import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { TasksStateType, TodoListType } from './Content';
import { useAppDispatch } from '../hook';
import {todoFilterAll, todoFilterActive, todoFilterCompleted, todoFilterUnlimited, todoFilterTimesLeft} from '../store/todoSlice'

interface TodoListFilteringPropsType {
    tasksObj: TasksStateType
    isTLCompleted: (tl: TodoListType, tasksObj: TasksStateType) => boolean
}

const TodoListFiltering: React.FC<TodoListFilteringPropsType> = ({tasksObj, isTLCompleted}) => {
    const dispatch = useAppDispatch() 
    
    return (
        <ButtonGroup color='success' variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => dispatch(todoFilterAll(null))}>All</Button>
            <Button onClick={() => dispatch(todoFilterActive({ tasksObj, isTLCompleted }))}>Active</Button>
            <Button onClick={() => dispatch(todoFilterCompleted({ tasksObj, isTLCompleted }))}>Completed</Button>
            <Button onClick={() => dispatch(todoFilterUnlimited(null))}>Unlimited time</Button>
            <Button onClick={() => dispatch(todoFilterTimesLeft({ tasksObj, isTLCompleted }))}>Time`s left</Button>
        </ButtonGroup>
    );
};

export default TodoListFiltering;