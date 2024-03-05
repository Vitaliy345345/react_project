import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v1 } from 'uuid'
import { filterValuesType, TasksStateType, TodoListType } from '../components/Content'
import { todoListId1, todoListId2 } from '../constants'

type TodosState = {
    list: TodoListType[],
    tasksList: TasksStateType,
    filteredList: TodoListType[]
}

const initialState: TodosState = {
    list: [
        { id: todoListId1, title: 'What to learn', filter: 'all', color: '#3B5249', time: new Date('2023-10-12, 20:30:24'), createTime: new Date('2023-07-12, 20:30:24') },
        { id: todoListId2, title: 'What to buy', filter: 'all', color: '#3B5249', time: new Date('2023-12-12, 17:00:00'), createTime: new Date('2023-08-12, 17:00:00') }
    ],
    tasksList: {
        [todoListId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: false },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'React', isDone: true },
            { id: v1(), title: 'Redux', isDone: true }
        ],

        [todoListId2]: [
            { id: v1(), title: 'Game', isDone: false },
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'PC', isDone: true }
        ]
    },
    filteredList: []
}

type CreateTodoPayloadTypes = {
    title: string,
    color: string,
    todoDate: Date | null,
    tasksList: TasksStateType
}

type RemoveTodoPayloadTypes = {
    todolistId: string,
    handleOpenSnack: (todolistId: string) => void
}

type todoFilterPayloadTypes = {
    tasksObj: TasksStateType,
    isTLCompleted: (tl: TodoListType, tasksObj: TasksStateType) => boolean
}

type todoChangeFilterPayloadTypes = {
    todolistId: string,
    value: filterValuesType
}

type todoEditHandlerPayloadTypes = {
    todolistId: string,
    newTitle: string,
    newColor: string,
    newTodoDate: Date
}

type todoChangeTitlePayloadTypes = {
    todolistId: string,
    newTitle: string
}

type createTaskPayloadType = {
    todolistId: string,
    newTitle: string
}

type removeTaskPayloadType = {
    todolistId: string,
    tasksId: string
}

type changeTaskTitlePayloadType = {
    todolistId: string,
    tasksId: string,
    newTitle: string
}

type changeTaskStatusPayloadType = {
    todolistId: string,
    tasksId: string,
    isDone: boolean
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createTodo(state, action: PayloadAction<CreateTodoPayloadTypes>) {
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.payload.title,
                filter: 'all',
                color: action.payload.color,
                time: action.payload.todoDate,
                createTime: new Date()
            }
            state.list.push(newTodoList)
            state.tasksList = ({ ...state.tasksList, [newTodoList.id]: [] })
        },

        removeTodo(state, action: PayloadAction<RemoveTodoPayloadTypes>) {
            state.list = state.list.filter(l => l.id !== action.payload.todolistId)
            action.payload.handleOpenSnack(action.payload.todolistId)
        },

        todoFilterActive(state, action: PayloadAction<todoFilterPayloadTypes>) {
            const currentDate = new Date()
            state.filteredList = state.list.filter(tl => {
                if (tl.time && action.payload.isTLCompleted(tl, action.payload.tasksObj) !== true) {
                    return tl.time > currentDate
                }
                else return null
            })
        },

        todoFilterCompleted(state, action: PayloadAction<todoFilterPayloadTypes>) {
            state.filteredList = state.list.filter(tl => action.payload.isTLCompleted(tl, action.payload.tasksObj))
        },

        todoFilterUnlimited(state, action: PayloadAction<null>) {
            state.filteredList = state.list.filter(tl => !tl.time)
        },

        todoFilterTimesLeft(state, action: PayloadAction<todoFilterPayloadTypes>) {
            const currentDate = new Date()
            state.filteredList = state.list.filter(tl => {
                if (tl.time && action.payload.isTLCompleted(tl, action.payload.tasksObj) !== true) {
                    return tl.time < currentDate
                }
                else return null
            })
        },

        todoFilterAll(state, action: PayloadAction<null>) {
            state.filteredList = state.list
            state.filteredList.map(l => console.log(l))
            
        },

        todoChangeFilter(state, action: PayloadAction<todoChangeFilterPayloadTypes>) {
            let newList = state.list.find(l => l.id === action.payload.todolistId)
            if (newList) {
                newList.filter = action.payload.value
            }
        },
        todoEditHandler(state, action: PayloadAction<todoEditHandlerPayloadTypes>) {
            const foundList = state.list.find(l => l.id === action.payload.todolistId)
            if (foundList) {
                foundList.title = action.payload.newTitle
                foundList.color = action.payload.newColor
                foundList.time = action.payload.newTodoDate
            }
        },
        todoChangeTitle(state, action: PayloadAction<todoChangeTitlePayloadTypes>) {
            const foundList = state.list.find(l => l.id === action.payload.todolistId)
            if (foundList) {
                foundList.title = action.payload.newTitle
            }
        },
        todoSortingDateDown(state, action: PayloadAction<null>) {
            state.filteredList = state.list.sort((a: TodoListType, b: TodoListType): number => 
                b.createTime.getTime() - a.createTime.getTime()
            )
        },
        todoSortingDateUp(state, action: PayloadAction<null>) {
            state.filteredList = state.list.sort((a: TodoListType, b: TodoListType): number =>
               a.createTime.getTime() - b.createTime.getTime()
            )
        },

        createTaskAction(state, action: PayloadAction<createTaskPayloadType>) {
            const tasks = state.tasksList[action.payload.todolistId]
            tasks.push({ id: v1(), title: action.payload.newTitle, isDone: false })
        },

        removeTaskAction(state, action: PayloadAction<removeTaskPayloadType>) {
            const tasks = state.tasksList[action.payload.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.payload.tasksId)
            state.tasksList[action.payload.todolistId] = filteredTasks
        },

        changeTaskTitleAction(state, action: PayloadAction<changeTaskTitlePayloadType>) {
            const tasks = state.tasksList[action.payload.todolistId]
            const foundTask = tasks.find(t => t.id === action.payload.tasksId)
            if(foundTask) {
                foundTask.title = action.payload.newTitle
            }
        },

        changeTaskStatusAction(state, action: PayloadAction<changeTaskStatusPayloadType>) {
            const tasks = state.tasksList[action.payload.todolistId]
            const foundTask = tasks.find(t => t.id === action.payload.tasksId)
            if(foundTask) {
                foundTask.isDone = action.payload.isDone
            }
        }

    }
})

export const {
    createTodo,
    removeTodo,
    todoFilterActive,
    todoFilterUnlimited,
    todoFilterCompleted,
    todoFilterTimesLeft,
    todoChangeFilter,
    todoEditHandler,
    todoChangeTitle,
    todoFilterAll,
    todoSortingDateDown,
    todoSortingDateUp,
    createTaskAction,
    removeTaskAction,
    changeTaskTitleAction,
    changeTaskStatusAction
} = todoSlice.actions

export const todoReducer = todoSlice.reducer
