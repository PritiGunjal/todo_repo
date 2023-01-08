import { Box, Button, Grid, TextField, Typography, ButtonGroup, colors, ListItemButton } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import DragDropTodo from './DragDropTodo'

const useStyle = makeStyles(() => ({
    mainContainer: {
        textAlign: 'center',
        marginTop: '40px'
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',

        marginTop: '20px'
    },
    addbuttonContainer: {
        display: 'flex',
        marginLeft: '20px',
    },
    input: {
        width: '500px'
    },
    buttonGroup: {
        width: '100%',
        marginTop: '30px',
    },
    todoButton: {
        width: '90%',
        '&.active': {
            backgroundColor: '#0066ff',
            color: 'white'
        }
    }
}))
const TodoList = () => {
    const classes = useStyle()

    const [selectedButton, setSelectedButton] = React.useState('all')
    const [todoData, setTodoData] = React.useState([])
    const [input, setInput] = React.useState('')
    let completedTodos = todoData.filter((item) => {
        return (item.complete === true)
      })
      let pendingTodos=todoData.filter((item) => {
        return (item.complete === false)
      })
    const handleAll = () => {
        setSelectedButton('all')
    }
    const handleCompleted = () => {
        setSelectedButton('completed')
    }
    const handlePending = () => {
        setSelectedButton('pending')
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    function onKeyDown(e) {
        if (e.key === "Enter" && input.trim()) {
            const id = todoData.length + 1
            setTodoData((prev) => [...prev, {
                id: id,
                task: input,
                complete: false,
            }])
            setInput('')
        }
    }
    const handleAddTodo = () => {
        if (input !== '') {
            const id = todoData.length + 1
            setTodoData((prev) => [...prev, {
                id: id,
                task: input,
                complete: false,
            }])
        }

        setInput('')
    }
    const handleDeleteTodo = (id) => {
        console.log(">>>id", id)
        const tasks = todoData.filter(element => (element.id !== id));
        console.log(">>>tasks", tasks)
        setTodoData(tasks);


    }
    const handleUpdateTodo = (id) => {
        let list = todoData.map((task) => {
            let item = {}
            if (task.id === id) {
                item = { ...task, complete: !task.complete }
            }
            else {
                item = { ...task }
            }
            return item
        })
        console.log(">>>list", list)
        setTodoData(list)
    }

    const handleEnd = (result) => {
        console.log(">>>res",result)

        let listData;
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        if(selectedButton==='all')
        {
            listData=todoData
        }
        else if(selectedButton==='completed')
        {
            listData=completedTodos
        }
        else
        {
            listData=pendingTodos
        }
        const projects = reorder(
            listData, // project is state 
            result.source.index,
            result.destination.index
        );
        //store reordered state.
        console.log(">>>projects",projects)
        setTodoData(projects)
    }
    // outside the component 
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const handlearrowKey = (event) => {
        const key = event.key;
        switch (event.key) {
            case "ArrowLeft":
                console.log(">>>left ey")
                break;
            case "ArrowRight":
                // Right pressed
                break;

        }
    }
    return (

        <Box className={classes.mainContainer}>
            <Box><Typography variant='h6'>TODO List Application</Typography></Box>
            <Box className={classes.inputContainer}>
                <TextField variant='outlined' placeholder='Enter your Todo' className={classes.input} value={input} onChange={handleChange} onKeyDown={onKeyDown}></TextField>
                <Box className={classes.addbuttonContainer}>  <Button variant='contained' onClick={handleAddTodo}>Add Todo</Button></Box>

            </Box>
            <ButtonGroup variant="text" aria-label="text button group" className={classes.buttonGroup} onKeyDown={handlearrowKey} >
                <Button onClick={handleAll} className={`${classes.todoButton} ${selectedButton === 'all' && 'active'}`}>Display All Todos</Button>
                <Button onClick={handleCompleted} className={`${classes.todoButton} ${selectedButton === 'completed' && 'active'}`}>Display Completed Todos</Button>
                <Button onClick={handlePending} className={`${classes.todoButton} ${selectedButton === 'pending' && 'active'}`}>Display Pending Todos</Button>
            </ButtonGroup>
            <Box>
                {
                    <DragDropTodo selectedButton={selectedButton} todoData={todoData} handleDeleteTodo={handleDeleteTodo} handleUpdateTodo={handleUpdateTodo} handleEnd={handleEnd} />
                }
            </Box>
        </Box>
    )
}

export default TodoList