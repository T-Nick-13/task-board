import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Queue",
    items: itemsFromBackend
  },
  [uuidv4()]: {
    name: "Development",
    items: []
  },
  [uuidv4()]: {
    name: "Done",
    items: []
  }
};

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

function Test() {
  const [columns, setColumns] = useState(columnsFromBackend);
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
                            /* : "lightgrey", */
                            : column.name === "Done" ? "rgb(93 186 2 / 25%)"
                            : column.name === "Development" ? "rgb(234 198 13 / 30%)"
                            : "#d5d5d5"

                        }}
                        className="dnd__container"
                      >
                        <button className="header__btn btn-cross dnd__btn" type="button" /* onClick={openPopup} */>
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" x2="100" y1="0" y2="100" />
                            <line x1="0" x2="100" y1="100" y2="0" />
                          </svg>
                          <span>New task</span>
                        </button>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
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
                                    {item.content}
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

export default Test;
