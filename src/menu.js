import React, { Component } from "react";
import styled from "styled-components";
import { TwitterPicker } from "react-color";
import { Button, Combobox, Dialog, Textarea, TextInput } from "evergreen-ui";
import { addNewTask, addNewColumn } from "./redux/actions/todo/index";
import { connect } from "react-redux";
import ColorPicker from "./colorPicker";

const Components = styled.div`
  padding: 1em;
  margin: 1em;
`;

const Item = styled.div`
  margin: 0 0.5em 0.7em 0.5em;
`;
const Submit = styled.div`
  margin: 0.5em;
  float: right;
`;
const Title = styled.div`
  margin: 0em 0 0.2em 0;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Styles = {
  boxShadow: "none",
};

class Menu extends Component {
  state = {
    taskIsShown: false,
    columnIsShown: false,
    task: { owner: "", name: "", color: "#FFFFFF", status: false, desk: "" },
    collum: { name: "", color: "#FFFFFF" },
  };

  render() {
    const comboBoxItems = this.props.todos[0].collums.map((column) => ({
      label: column.name,
      id: column._id,
    }));
    return (
      <Components>
        <Dialog
          isShown={this.state.taskIsShown}
          title="Add new task"
          onCloseComplete={() => this.setState({ taskIsShown: false })}
          hasFooter={false}
        >
          <Inputs>
            <Item>
              <Title>Column</Title>
              <Combobox
                style={Styles}
                width={"100%"}
                items={comboBoxItems}
                itemToString={(item) => (item ? item.label : "")}
                onChange={(selected) =>
                  this.setState({
                    task: { ...this.state.task, owner: selected.id },
                  })
                }
                placeholder={"Select the column"}
              />
            </Item>
            <Item>
              <Title>Name</Title>
              <TextInput
                width={"100%"}
                onChange={(e) =>
                  this.setState({
                    task: { ...this.state.task, name: e.target.value },
                  })
                }
                value={this.state.task.name}
                placeholder={"Enter the task name"}
              />
            </Item>
          </Inputs>
          <Item>
            <Title>Color</Title>
            <ColorPicker
              color={this.state.task.color}
              onChangeComplete={(color) =>
                this.setState({
                  task: { ...this.state.task, color: color },
                })
              }
            />
          </Item>
          <Item>
            <Title>Description</Title>
            <Textarea
              onChange={(e) =>
                this.setState({
                  task: { ...this.state.task, desk: e.target.value },
                })
              }
              value={this.state.task.desk}
              placeholder="Enter the task description"
            />
          </Item>

          <Submit>
            <Button
              onClick={() => {
                this.props.addNewTask(this.state.task);
                this.setState({
                  taskIsShown: false,
                  task: { color: "#FFFFFF", status: false },
                });
              }}
            >
              Submit
            </Button>
          </Submit>
        </Dialog>

        <Dialog
          isShown={this.state.columnIsShown}
          title="Add new column"
          onCloseComplete={() => this.setState({ columnIsShown: false })}
          hasFooter={false}
        >
          <Item>
            <Title>Name</Title>
            <TextInput
              onChange={(e) =>
                this.setState({
                  collum: { ...this.state.collum, name: e.target.value },
                })
              }
              value={this.state.collum.name}
              placeholder={"Enter the column name"}
            />
          </Item>
          <Item>
            <Title>Color</Title>
            <TwitterPicker
              color={this.state.collum.color}
              triangle={"hide"}
              onChangeComplete={(color) =>
                this.setState({
                  collum: { ...this.state.collum, color: color.hex },
                })
              }
            />
          </Item>
          <Submit>
            <Button
              onClick={() => {
                this.props.addNewColumn(this.state.collum);
                this.setState({ columnIsShown: false });
              }}
            >
              Submit
            </Button>
          </Submit>
        </Dialog>

        <Button onClick={() => this.setState({ taskIsShown: true })}>
          New task
        </Button>
        <Button
          marginLeft={"1em"}
          onClick={() => this.setState({ columnIsShown: true })}
        >
          New column
        </Button>
      </Components>
    );
  }
}

export default connect(null, { addNewTask, addNewColumn })(Menu);
