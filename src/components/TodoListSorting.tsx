import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../hook';
import {todoSortingDateDown, todoSortingDateUp} from '../store/todoSlice'

const TodoListSorting: React.FC = () => {
    const dispatch = useAppDispatch()

    return (
        <ButtonGroup>
          <Button
            variant='contained'
            color='success'
            onClick={() => dispatch(todoSortingDateUp(null))}
          >
            Sort up
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => dispatch(todoSortingDateDown(null))}
          >
            Sort down
          </Button>
        </ButtonGroup>
    );
};

export default TodoListSorting;