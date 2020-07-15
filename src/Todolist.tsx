import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {FilterValuesType} from './AppWithRedux';
import {Task, TaskType} from './Task';

type PropsType = {
    id: string
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback (() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback( (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback (() => props.changeFilter('all', props.id), [props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback (() => props.changeFilter('active', props.id), [props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback ( () => props.changeFilter('completed', props.id), [props.changeFilter,props.id]);

    if(props.filter === 'active') {
        tasks = tasks.filter ( t => t.isDone === false)
    }
    if(props.filter === 'completed') {
        tasks = tasks.filter ( t => t.isDone === true)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => <Task key={t.id} removeTask={props.removeTask}
                                     taskId={t.id} todoListId={props.id}
                                     isDone={t.isDone} title={t.title}
                                     changeTaskTitle={props.changeTaskTitle} changeTaskStatus={props.changeTaskStatus}/> )

                    // const onClickHandler = () => props.removeTask(t.id, props.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }
                    // const onTitleChangeHandler = (newValue: string) => {
                    //     props.changeTaskTitle(t.id, newValue, props.id);
                    // }
                    //
                    //
                    // return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                    //     <Checkbox
                    //         checked={t.isDone}
                    //         color="primary"
                    //         onChange={onChangeHandler}
                    //     />
                    //
                    //     <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                    //     <IconButton onClick={onClickHandler}>
                    //         <Delete/>
                    //     </IconButton>
                    // </div>

            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

