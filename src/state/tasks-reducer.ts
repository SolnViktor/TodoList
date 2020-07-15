import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskType} from '../Task';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            // let newState:TasksStateType = {}
            // for (let key in state) {
            //     if (key !== action.todolistId) {
            //         newState[key] = state[key]
            //     } else {
            //         newState[action.todolistId] = state[action.todolistId]
            //             .map(t => {
            //             if(t.id !== action.taskId) {
            //                 return t
            //             } else return {...t, isDone: action.isDone}
            //         })
            //     }
            // }
            let newState = changeStatusAndTitle(state, action.todolistId, action.taskId, action.isDone)

            // let todolistTasks = state[action.todolistId];
            // todolistTasks = todolistTasks.map(t => {
            //     if(t.id === action.taskId) {
            //         return {...t, isDone: action.isDone}
            //     } else return t
            // });
            // state[action.todolistId] = todolistTasks
            return newState;
        }
        case 'CHANGE-TASK-TITLE': {
            // let newState:TasksStateType = {}
            // for(let key in state) {
            //     if(key !== action.todolistId) {
            //         newState[key] = state[key]
            //     } else {
            //         newState[action.todolistId] = state[action.todolistId].map(t => {
            //             if(t.id !== action.taskId) {
            //                 return t
            //             } else return {...t, title: action.title}
            //         })
            //     }
            // }
            let newState = changeStatusAndTitle(state, action.todolistId, action.taskId, action.title)

            // let newTaskArr = state[action.todolistId].map(t => {           // Оптимальный вариант ??
            //                 if(t.id !== action.taskId) {
            //                     return t
            //                 } else return {...t, title: action.title}
            //             })
            //
            // let newState = {...state,  [action.todolistId]: newTaskArr}


            // let todolistTasks = state[action.todolistId];
            // // найдём нужную таску:
            // let task = todolistTasks.find(t => t.id === action.taskId);
            // //изменим таску, если она нашлась
            // if (task) {
            //     task.title = action.title;
            // }
            return newState;
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

const changeStatusAndTitle = (state:TasksStateType, todolistId: string, taskId: string, item: boolean | string) => {
    let newState:TasksStateType = {}
    for(let key in state) {
        if(key !== todolistId) {
            newState[key] = state[key]
        } else {
            newState[todolistId] = state[todolistId].map(t => {
                if(t.id !== taskId) {
                    return t
                } else {
                    if(typeof item === 'string') {
                        return {...t, title: item}
                    } else {
                        return {...t, isDone: item}
                    }

                }
            })
        }
    }
    return newState
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

