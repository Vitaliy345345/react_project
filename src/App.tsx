import React, { useState, useLayoutEffect } from 'react';
import './styles/App.css';
import { v1 } from 'uuid'
import TodoList, { TaskType } from './components/TodoList';
import { Container, Grid } from '@mui/material';
import ModalWindow from './components/ModalWindow';
import { ControlPoint } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import SnackBarDelete from './components/SnackBarDelete';
import TodoListFiltering from './components/TodoListFiltering';
import AppBarComponent from './components/AppBarComponent';
import { useAppDispatch, useAppSelector } from './hook';
import {
  createTodo,
  removeTodo,
  todoChangeFilter,
  todoEditHandler,
  todoChangeTitle,
  todoFilterAll,
  createTaskAction,
  removeTaskAction,
  changeTaskTitleAction,
  changeTaskStatusAction
} from './store/todoSlice'

import { todoListId1, todoListId2 } from './constants';
import TodoListSorting from './components/TodoListSorting';
import { createContext } from 'react';
export type filterValuesType = "completed" | "active" | "all";
export type btnDisplayType = 'none' | 'block';

export type TodoListType = {
  id: string,
  title: string,
  filter: filterValuesType
  color: string
  time: Date | null
  createTime: Date
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export const isTLCompleted = (tl: TodoListType, tasksObj: TasksStateType): boolean => {
  const taskForTodoList = tasksObj[tl.id]
  if (taskForTodoList.every(t => t.isDone === true)
    && taskForTodoList.length > 0) {
    return true
  }
  else return false
}

function App() {
  const dispatch = useAppDispatch();

  const {
    list,
    filteredList,
    tasksList
  } = useAppSelector(state => state.todos)

  useLayoutEffect(() => {
    dispatch(todoFilterAll(null))
  }, [list])
  const [openModal, setOpenModal] = useState(false);
  const [color, setColor] = useState('#382933');
  const [todoDate, setTodoDate] = useState<Date | null>(null);
  const [timeValue, setTimeValue] = useState<string | null>(null);
  const [btnDisplay, setBtnDisplay] = useState<btnDisplayType | null>(null);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string | null>(null)

  const handleOpenDialog = () => setOpenModal(true)

  const handleOpenSnack = (todolistId: string) => {
    let getTodo = list.find(l => l.id === todolistId)
    getTodo ? setTodoTitle(getTodo.title) : setTodoTitle('')
    setOpenSnack(true);
  }

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  }

  const changeTaskStatus = (tasksId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAction({ todolistId, tasksId, isDone }))
  }

  const changeTaskTitle = (tasksId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAction({ todolistId, tasksId, newTitle }))
  }

  const onChangeTodoListTitle = (newTitle: string, todolistId: string) => {
    dispatch(todoChangeTitle({ todolistId, newTitle }))
  }

  const editHandler = (newTitle: string, newColor: string, newTodoDate: Date, todolistId: string) => {
    dispatch(todoEditHandler({ todolistId, newTitle, newColor, newTodoDate }))
  }

  const changeFilter = (value: filterValuesType, todolistId: string) => {
    dispatch(todoChangeFilter({ todolistId, value }))
  }

  const removeTask = (tasksId: string, todolistId: string) => {
    dispatch(removeTaskAction({ todolistId, tasksId }))
  }

  const createTask = (newTitle: string, todolistId: string) => {
    dispatch(createTaskAction({ todolistId, newTitle }))
  }

  const removeTodoList = (todolistId: string) => {
    dispatch(removeTodo({ todolistId, handleOpenSnack }))
  }

  const createTodoList = (title: string) => {
    dispatch(createTodo({ title, color, todoDate, tasksList }))
  }

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(74deg, rgba(17, 24, 4, 1) 14%, rgba(3, 129, 10, 1) 100%)'
    }}>

      <AppBarComponent />

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
        <TodoListFiltering
          tasksObj={tasksList}
          isTLCompleted={isTLCompleted}
        />
        <TodoListSorting />
      </div>

      <AnimatePresence>
        <div className="container">
          <Container fixed>
            <Grid
              container
            >
              {
                filteredList.map(tl => {
                  let taskForTodoList = tasksList[tl.id]
                  if (tl.filter === 'completed') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                  }

                  if (tl.filter === 'active') {
                    taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
                  }

                  return (
                    <Grid item margin={'26px'}>
                      <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        color={tl.color}
                        setColor={setColor}
                        time={tl.time}
                        createTime={tl.createTime}
                        timeValue={timeValue}
                        todoDate={todoDate}
                        setTodoDate={setTodoDate}
                        task={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        onChangeTodoListTitle={onChangeTodoListTitle}
                        handleOpenDialog={handleOpenDialog}
                        editHandler={editHandler}
                      />

                    </Grid>
                  )
                })
              }
              <button
                onClick={handleOpenDialog}
                className='create__task--btn'
                style={btnDisplay ? { display: btnDisplay } : {}}
              >
                <ControlPoint sx={{
                  height: '150px',
                  width: '150px',
                  transition: '0.4s',
                  opacity: '0.4',
                  ":hover": { opacity: '0.7' }
                }} />
              </button>
            </Grid>
            <ModalWindow
              //findTimeToComplete={findTimeToComplete}
              color={color}
              setColor={setColor}
              openModal={openModal}
              setOpenModal={setOpenModal}
              createTodoList={createTodoList}
              todoDate={todoDate}
              setTodoDate={setTodoDate}
            />
            <SnackBarDelete open={openSnack} onClose={handleCloseSnack} todoTitle={todoTitle} />
          </Container>
        </div>
      </AnimatePresence>
      {/* <PaginationComponent
        setBtnDisplay={setBtnDisplay}
        todoLists={todoLists}
        setTLists={((tl: React.SetStateAction<TodoListType[]>) => setTLists(tl))} /> */}
    </div>
  );
}

export default App;
