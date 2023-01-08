import React from 'react'
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useKeyPress from "./useKeyPress";
import { Box } from '@mui/material';

const initialState = { selectedIndex: 0 };
const DragDropTodo = (props) => {

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(">>>props", props.selectedButton)
  let completedTodos = props.todoData.filter((item) => {
    return (item.complete === true)
  })
  let pendingTodos=props.todoData.filter((item) => {
    return (item.complete === false)
  })
  React.useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);

  React.useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);
  function reducer(state, action) {
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex !== 0 ? state.selectedIndex - 1 : props.todoData.length - 1
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex !== props.todoData.length.length - 1 ? state.selectedIndex + 1 : 0
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }


  return (
    <div className="App">
      {
        props.selectedButton === 'all' ?
          <DragDropContext onDragEnd={props.handleEnd}>
            <Droppable droppableId="drop">

              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {

                    props.todoData.map((item, index) => (
                      <Box onClick={() => {
                        dispatch({ type: "select", payload: index });
                      }}
                        style={{
                          cursor: "pointer",
                          color: index === state.selectedIndex ? "#0066ff" : "black"
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            dispatch({ type: "select", payload: index });
                            e.target.blur();
                          }
                        }}>
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}

                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              key={item.id}
                              className={
                                snapshot.isDragging ? "selected" : "not-selected"
                              }
                            >

                              <TodoItem id={item.id} key={index} task={item.task} complete={item.complete} handleDeleteTodo={props.handleDeleteTodo} handleUpdateTodo={props.handleUpdateTodo} />

                            </div>

                          )}
                        </Draggable></Box>

                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> : props.selectedButton === 'completed' ?
            <DragDropContext onDragEnd={props.handleEnd}>
              <Droppable droppableId="drop">

                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {

                      completedTodos.length > 0 ? completedTodos.map((completeItem, index) => (
                        <Box onClick={() => {
                          dispatch({ type: "select", payload: index });
                        }}
                          style={{
                            cursor: "pointer",
                            color: index === state.selectedIndex ? "#0066ff" : "black"
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              dispatch({ type: "select", payload: index });
                              e.target.blur();
                            }
                          }}>
                          <Draggable
                            key={completeItem.id}
                            draggableId={completeItem.id.toString()}
                            index={index}

                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                key={completeItem.id}
                                className={
                                  snapshot.isDragging ? "selected" : "not-selected"
                                }
                              >

                                <TodoItem id={completeItem.id} key={index} task={completeItem.task} complete={completeItem.complete} handleDeleteTodo={props.handleDeleteTodo} handleUpdateTodo={props.handleUpdateTodo} />

                              </div>

                            )}
                          </Draggable></Box>

                      )) : <Box style={{ marginTop: '30px' }}>No Data Available</Box>}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext> :
            <DragDropContext onDragEnd={props.handleEnd}>
              <Droppable droppableId="drop">

                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {

pendingTodos.length>0? pendingTodos.map((completeItem, index) => (
                        <Box onClick={() => {
                          dispatch({ type: "select", payload: index });
                        }}
                          style={{
                            cursor: "pointer",
                            color: index === state.selectedIndex ? "#0066ff" : "black"
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              dispatch({ type: "select", payload: index });
                              e.target.blur();
                            }
                          }}>
                          <Draggable
                            key={completeItem.id}
                            draggableId={completeItem.id.toString()}
                            index={index}

                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                key={completeItem.id}
                                className={
                                  snapshot.isDragging ? "selected" : "not-selected"
                                }
                              >

                                <TodoItem id={completeItem.id} key={index} task={completeItem.task} complete={completeItem.complete} handleDeleteTodo={props.handleDeleteTodo} handleUpdateTodo={props.handleUpdateTodo} />

                              </div>

                            )}
                          </Draggable></Box>

                      )):<Box style={{ marginTop: '30px' }}>No Data Available</Box>}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
      }

    </div>
  );
}

export default DragDropTodo