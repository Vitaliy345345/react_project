import { Delete, HighlightOff, Info, Settings } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Button, Divider, IconButton, Typography } from '@mui/material';
import React, { useState, ChangeEvent, } from 'react';
import { filterValuesType } from '../App';
import '../styles/TodoListStyle.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan'
import Deadline from './Deadline';
import { isTimeLeft } from '../utils/isTimeLeft'
import { isTodoListCompleted } from '../utils/isTodoListCompleted';
import { MPaper } from '../UI/MPaper';
import InfoMenu from './InfoMenu';
import { lightGreen } from '../constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import DialogSubmit from './DialogSubmit';
import EditMenu from './EditMenu';
import { useAppSelector } from '../hook';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    task: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    createTask: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: filterValuesType
    removeTodolist: (todolistId: string) => void
    onChangeTodoListTitle: (newTitle: string, todoListId: string) => void
    editHandler: (newTitle: string, newColor: string, newTodoDate: Date, todolistId: string) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    time: Date | null
    todoDate: Date | null
    setTodoDate: React.Dispatch<React.SetStateAction<Date | null>>
    timeValue: string | null
    handleOpenDialog: () => void
    createTime: Date
}

const TodoList = (props: PropsType) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [anchorElInfo, setAnchorElInfo] = useState<null | HTMLElement>(null);
    const [anchorElEdit, setAnchorElEdit] = useState<null | HTMLElement>(null);
    const openInfo = Boolean(anchorElInfo);
    const openEdit = Boolean(anchorElEdit);

    const onAllClickHandler = () => {
        props.changeFilter('all', props.todoListId)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.todoListId)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.todoListId)
    }
    const removeTodoList = () => {
        props.removeTodolist(props.todoListId)
    }
    const createTask = (title: string) => {
        props.createTask(title, props.todoListId)
    }
    const onChangeTodoListTitle = (newTitle: string, newColor?: string, newTodoDate?: Date) => {
        props.onChangeTodoListTitle(newTitle, props.todoListId)
        if(newColor && newTodoDate){
            props.editHandler(newTitle, newColor, newTodoDate, props.todoListId)
        }
    }

    const shadowHandler = (): string | undefined => {
        if (!props.time) {
            return 'orange'
        } else if (props.task.length === 0) {
            return 'grey'
        } else if (isTodoListCompleted(props.time, new Date(), props.task) === false) {
            return 'red'
        } else if (isTodoListCompleted(props.time, new Date(), props.task) === true) {
            return 'green'
        }
        return 'grey'
    }
    const deadlineHandler = () => {
        if (props.task.length === 0) {
            return <Deadline time={props.time} />
        } else if (props.task.every(t => t.isDone === true)) {
            return <Typography sx={{ color: '#65B741' }} fontWeight={'bold'} fontSize={'20px'}>
                COMPLETED
            </Typography>
        }
        return <Deadline time={props.time} />
    }

    const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElInfo(event.currentTarget);

    const handleInfoClose = () => setAnchorElInfo(null);

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElEdit(event.currentTarget);

    const handleEditClose = () => setAnchorElEdit(null)

    const handleDialogClickOpen = () => setOpenDialog(true)

    const handleDialogClickClose = () => setOpenDialog(false)


    return (
        <>
            <div>
                <MPaper
                    elevation={3} style={{
                        borderRadius: '20px',
                        paddingBottom: '15px',
                        boxShadow: `0px 0px 15px ${shadowHandler()}`,
                        // backgroundColor: 'rgba(255,255,255, 0.8)',
                        filter: `${openInfo ? 'blur(2px)' : ''}`
                    }}
                    key={props.todoListId}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    <div className='paper__header' style={{ backgroundColor: props.color }}>
                        <div className='action__btns'>
                            <IconButton className='info__btn'
                                sx={{ color: '#BED754' }}
                                onClick={handleInfoClick}
                            >
                                <Info />
                            </IconButton>
                            <div>
                                <IconButton
                                    sx={{ color: '#BED754' }}
                                    onClick={handleEditClick}
                                >
                                    <Settings />
                                </IconButton>
                                <IconButton
                                    sx={{ color: '#BED754' }}
                                    onClick={handleDialogClickOpen}
                                >
                                    <Delete />
                                </IconButton >
                            </div>
                        </div>
                        <h2>
                            <Typography style={{
                                fontSize: '25px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <EditableSpan
                                    textColor={lightGreen}
                                    title={props.title}
                                    onChange={onChangeTodoListTitle}
                                />
                            </Typography>
                            <Divider sx={{ backgroundColor: `${lightGreen}`, marginY: '8px' }} variant='middle' />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {deadlineHandler()}
                            </div>
                        </h2>
                    </div>
                    <Accordion style={{ borderRadius: '20px', width: '330px' }} elevation={0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>
                                Tasks
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderRadius: '20px', padding: '0', width: '330px' }}>
                            <div style={{ margin: '0 20px 20px 20px' }}>
                                <AddItemForm
                                    disabled={props.time ? isTimeLeft(props.time, new Date()) : false}
                                    title={'Add task'}
                                    variant={'filled'}
                                    createItem={createTask} />

                                <div style={{ margin: '20px 0 20px 0' }}>
                                    {
                                        props.task.map(t => {
                                            
                                            const onRemoveTaskHandler = () => {
                                                props.removeTask(t.id, props.todoListId)
                                            }
                                            const onChangeTaskIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
                                            }

                                            const onChangeTaskTitle = (newTitle: string) => {
                                                props.changeTaskTitle(t.id, newTitle, props.todoListId)
                                            }
                                            
                                            const isTaskDoneBorder = (): string | undefined => {
                                                if (!props.time) {
                                                    return 'green'
                                                } else if (isTimeLeft(props.time, new Date())) {
                                                    if (t.isDone === false) {
                                                        return 'red'
                                                    } else return 'green'
                                                }
                                                return 'green'
                                            }

                                            return <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >

                                                <div
                                                    className={t.isDone ? 'is-done' : 'todo'}
                                                    style={{
                                                        border: `2px solid ${isTaskDoneBorder()}`,
                                                        display: 'flex',
                                                        flexDirection: 'row'
                                                    }}>
                                                    <Checkbox
                                                        key={t.id}
                                                        onChange={onChangeTaskIsDoneHandler}
                                                        checked={t.isDone}
                                                        color='success'
                                                        disabled={props.time ? isTimeLeft(props.time, new Date()) : false}
                                                    />
                                                    <div className='tasks__content'>
                                                        <EditableSpan textColor='' title={t.title} onChange={onChangeTaskTitle} />
                                                        <IconButton disabled={props.time ? isTimeLeft(props.time, new Date()) : false} color='success' onClick={onRemoveTaskHandler}>
                                                            <HighlightOff />
                                                        </IconButton >
                                                    </div>
                                                </div>
                                            </motion.div>
                                        })
                                    }
                                </div>
                                <div className='filter-btns'>
                                    <Button
                                        onClick={onAllClickHandler} id='all'
                                        variant={props.filter === 'all' ? 'contained' : 'outlined'}
                                        color={'success'}
                                        sx={{ borderRadius: '15px' }}
                                    >All
                                    </Button>
                                    <Button
                                        onClick={onActiveClickHandler} id='active'
                                        variant={props.filter === 'active' ? 'contained' : 'outlined'}
                                        color={'success'}
                                        sx={{ borderRadius: '15px' }}
                                    >Active
                                    </Button>
                                    <Button
                                        onClick={onCompletedClickHandler} id='completed'
                                        variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                                        color={'success'}
                                        sx={{ borderRadius: '15px' }}
                                    >Completed
                                    </Button>
                                </div>
                                <EditMenu
                                    open={openEdit}
                                    anchorEl={anchorElEdit}
                                    onClose={handleEditClose}
                                    title={props.title}
                                    onChange={onChangeTodoListTitle}
                                    color={props.color}
                                    time={props.time}
                                />
                                <InfoMenu
                                    tasks={props.task}
                                    deadline={props.time}
                                    title={props.title}
                                    anchorEl={anchorElInfo}
                                    open={openInfo}
                                    onClose={handleInfoClose}
                                    createTime={props.createTime}
                                />
                                <DialogSubmit
                                    open={openDialog}
                                    onClose={handleDialogClickClose}
                                    removeTodoList={removeTodoList}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </MPaper>
            </div>
        </>
    );
}

export default TodoList;