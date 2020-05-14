import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import {Button, Combobox, Dialog, IconButton, Menu, Popover, Textarea, TextInput} from "evergreen-ui";
import {changeTask, deleteTask} from "./redux/actions/todo";
import {connect} from "react-redux";
import ColorPicker from "./colorPicker";

const Container = styled.div`
    border: none;
    box-shadow:0 0px 5px rgba(127, 126, 126, 0.6),0 0px 0px rgba(0,0,0,0.22);
    border-radius: 3px;
    overflow: hidden;
text-overflow: ellipsis;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props =>
            props.color ?
                props.color : 
                'white'};
`;
const Name = styled.div`
float: left;
width: 90%;
`
const More = styled.div`
float:right;
width: 10%;
`
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


class Task extends React.Component {
    state={
        activeId: null,
        task: {_id:null, owner: "", name: "", color: "", status: null, desk: "" },
    }
    render() {


        return (
            <Draggable
                draggableId={this.props.task._id}
                index={this.props.index}
            >

                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        color={this.props.task.color}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Dialog
                            isShown={this.state.activeId === this.props.task._id}
                            title="Edit task"
                            onCloseComplete={() => this.setState({ activeId: null })}
                            hasFooter={false}
                        >
                            <Inputs>
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
                                    appearance="minimal"
                                    intent="success"
                                    onClick={() => {
                                        this.props.changeTask(this.state.task);
                                        this.setState({
                                            activeId: false,
                                            task: {_id:null, owner: "", name: "", color: "", status: null, desk: "" },
                                        });
                                    }}
                                    disabled={
                                        this.state.task.owner === "" || this.state.task.owner === null
                                    }
                                >
                                    Submit
                                </Button>
                            </Submit>
                        </Dialog>
                        <Name>{this.props.task.name}</Name>
                        <More>
                        <Popover
                            position={"bottom-left"}
                            content={
                                <Menu>
                                    <Menu.Group>
                                        <Menu.Item
                                            onSelect={() => this.setState({
                                                activeId: this.props.task._id,
                                                task: { _id:this.props.task._id, owner: this.props.task.owner, name: this.props.task.name, color: this.props.task.color, status: this.props.task.status, desk: this.props.task.desk },
                                            })}
                                        >
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item intent="danger" onSelect={() => {
                                            this.props.deleteTask(this.props.task._id);
                                        }}>
                                            Delete
                                        </Menu.Item>
                                    </Menu.Group>
                                </Menu>
                            }
                        >
                            <IconButton height={24} appearance="minimal" icon="more" />
                        </Popover>
                        </More>
                    </Container>
                )}
            </Draggable>
        );
    }
}
export default connect(null,{changeTask, deleteTask})(Task)