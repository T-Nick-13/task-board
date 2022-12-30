import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocation } from 'react-router-dom';
import TaskListItem from "../TaskListItem/TaskListItem";

function TaskBoard(props) {
  const project = useLocation().pathname.slice(1);
  const initialTasks = JSON.parse(localStorage.getItem('tasks'));
  const [taskList, setTaskList] = useState(initialTasks.filter((i) => i.projectId === project))

  function presetTasks() {
    let arr = [];
    Object.entries(columns).forEach((i) => {
      i[1].items.forEach((t) => {
        t.status = i[0];
        t.index = i[1].items.indexOf(t);
        arr.push(t);
      })
    })
    let result = [...arr].reduce((a, c) => (a.map(e=>e._id).includes(c._id) || a.push(c), a), []);
    localStorage.setItem('newTasks', JSON.stringify(result));
  }

  const columnsFromBackend = {
    Queue: {
      name: "Queue",
      items: taskList.filter((i) => i.status === "Queue")
    },
    Development: {
      name: "Development",
      items: taskList.filter((i) => i.status === "Development")
    },
    Done: {
      name: "Done",
      items: taskList.filter((i) => i.status === "Done")
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  React.useEffect(() => {
    props.editTaskOnBoard(JSON.parse(localStorage.getItem('newTasks')));
  }, [])

  React.useEffect(() => {
    const newTasks = JSON.parse(localStorage.getItem('newTasks')).filter((i) => i.projectId === project);
    setTaskList(newTasks);
    const columnsFromBackend = {
      Queue: {
        name: "Queue",
        items: newTasks.filter((i) => i.status === "Queue")
      },
      Development: {
        name: "Development",
        items: newTasks.filter((i) => i.status === "Development")
      },
      Done: {
        name: "Done",
        items: newTasks.filter((i) => i.status === "Done")
      }
    };
    setColumns(columnsFromBackend);
  }, [props.taskList])

  React.useEffect(() => {
    presetTasks();
  }, [columns])

  function onTaskClick(task) {
    props.openTask(task);
  }

  function onNewTaskClick(e) {
    props.openNewTask(e.currentTarget.dataset.status);
  }

  return (
    <main className="dnd">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className="dnd__column"
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#b7b7b7"
                            : column.name === "Done" ? "rgb(93 186 2 / 25%)"
                            : column.name === "Development" ? "rgb(234 198 13 / 30%)"
                            : "#d5d5d5"

                        }}
                        className="dnd__container"
                      >
                        <button className="btn-cross dnd__btn" type="button" data-status={column.name} onClick={onNewTaskClick}>
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" x2="100" y1="0" y2="100" />
                            <line x1="0" x2="100" y1="100" y2="0" />
                          </svg>
                          <span>New task</span>
                        </button>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#ffffffc9"
                                        : "#ffffff5e",
                                      ...provided.draggableProps.style
                                    }}
                                    className="dnd__task"
                                  >
                                    <TaskListItem
                                      task={item}
                                      onTaskClick={onTaskClick}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}


                      </div>
                    );
                  }}

                </Droppable>
              </div>
            </div>
          );
        })}

      </DragDropContext>
    </main>
  );
}

export default TaskBoard;
