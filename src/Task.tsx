import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {FilterValuesType} from './AppWithRedux';

type PropsType = {
    todoListId: string
    taskId: string
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    isDone: boolean
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export type TaskType = {
    isDone: boolean
    title: string
    id: string
}


export const Task = React.memo((props: PropsType) => {
    const onClickHandler = useCallback( () => props.removeTask(props.taskId, props.todoListId), [props.removeTask, props.taskId, props.todoListId])
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.todoListId);
    }, [props.changeTaskStatus, props.taskId, props.todoListId])
    const onTitleChangeHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.taskId, newValue, props.todoListId);
    }, [props.changeTaskTitle, props.taskId, props.todoListId])


    return <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})