import { Box, Typography } from '@mui/material'
import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import SwapVertIcon from '@mui/icons-material/SwapVert';
const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '50%',
    margin: 'auto',
    border: '1px solid #d9c6b8',
    marginTop: '20px',
    borderRadius: '6px'
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskName: {
    width: '80%',
    textAlign: 'start',
    paddingLeft: '20px',
    textDecoration: (props) => props.complete ? 'line-through' : '',
  },
  deleteIcon: {
    color: '#0066ff'
  }
}))
const TodoItem = (props) => {
  const classes = useStyles(props)
  return (

    <Box className={classes.mainContainer} >
      {console.log(">>>props", props)}
      <Box className={classes.dataContainer}>

        <Typography style={{ textDecoration: props.complete ? 'line-through' : '' }} className={classes.taskName}>{props.task}</Typography>
        <Box className={classes.dataContainer}>
          <Checkbox onChange={() => props.handleUpdateTodo(props.id)} checked={props.complete}></Checkbox>
          <Delete className={classes.deleteIcon} onClick={() => props.handleDeleteTodo(props.id)} />
          <SwapVertIcon/>
        </Box>

      </Box>


    </Box>
  )
}

export default TodoItem