import React from "react";
import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./column";
import { connect } from "react-redux";
import {
  getTodos,
  changeColumns,
  addNewColumn,
  deleteColumn,
  deleteTask,
  patchColumn,
  patchColumns,
} from "./redux/actions/todo";
import Menu from "./menu";
import { Pane } from "evergreen-ui";
import socket from "socket.io-client";
const io = socket("http://localhost:5000", {
  transports: ["websocket"],
});

const Container = styled.div`
  display: flex;
`;

class Todo extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.app.todo.todos !== state.todos) {
      return {
        todos: props.app.todo.todos,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }
  state = {
    todos: null,
  };

  async componentDidMount() {
    await this.props.getTodos();
    this.setState({
      todos: this.props.app.todo.todos,
    });
    await io.on("data", (data) => {
      this.props.getTodos();
    });
  }

  onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.todos[0].collums);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(
        destination.index,
        0,
        this.state.todos[0].collums[source.index]
      );
      const newTodos = {
        0: { ...this.state.todos, collums: newColumnOrder },
      };
      this.props.patchColumn(newColumnOrder, newTodos);
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = this.state.todos[0].collums.find(
        (p) => p._id === source.droppableId
      );
      const destColumn = this.state.todos[0].collums.find(
        (p) => p._id === destination.droppableId
      );
      const sourceItems = sourceColumn.tasks;
      const destItems = destColumn.tasks;
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      this.props.patchColumns({
        sourceColumn,
        destColumn,
      });
    } else {
      const column = this.state.todos[0].collums.find(
        (p) => p._id === source.droppableId
      );
      const copiedItems = column.tasks;
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      this.props.changeColumns(column);
    }
  };

  render() {
    return this.state.todos !== null && this.state.todos.length !== 0 ? (
      <React.Fragment>
        <Menu todos={this.state.todos} />
        <Pane
          display="flex"
          margin={"1em"}
          minHeight={"70vh"}
          width={"100%-2em"}
          overflow={"auto"}
        >
          <DragDropContext
            onDragEnd={this.onDragEnd}
            // onDragStart={this.onDragStart}
          >
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <Container ref={provided.innerRef} {...provided.droppableProps}>
                  {this.state.todos[0].collums.map((columnId, index) => {
                    const column = columnId;
                    return (
                      <Column
                        key={column._id}
                        column={column}
                        tasks={column.tasks}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        </Pane>
      </React.Fragment>
    ) : null;
  }
}
const mapStateToProps = (state) => {
  return {
    app: state.todoApp,
  };
};
export default connect(mapStateToProps, {
  getTodos,
  addNewColumn,
  deleteColumn,
  deleteTask,
  changeColumns,
  patchColumn,
  patchColumns,
})(Todo);
