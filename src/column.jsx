import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task.jsx';
import {BsThreeDots, MdSettings} from "react-icons/all";
import {Button, Dialog, TextInput} from "evergreen-ui";
import {TwitterPicker} from "react-color";
import ColorPicker from "./colorPicker";
import {changeColumns, deleteColumn} from "./redux/actions/todo";
import {connect} from "react-redux";

const Container = styled.div`
    margin: 8px;
    border: none;
        box-shadow:0 0px 5px rgba(127, 126, 126, 0.6),0 0px 0px rgba(0,0,0,0.22);

    background: white;
    border-radius: 5px;
    width: 300px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;

const Title2 = styled.div`
  margin: 0em 0 0.2em 0;
`;

const TaskList = styled.div`
    border-radius: 0 0 5px 5px;
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.color ? props.color: 'white')};
    flex-grow: 1;
    height:auto
`;

const Item = styled.div`
  margin: 0 0.5em 0.7em 0.5em;
`;
const Submit = styled.div`
  margin: 0.5em;
  float: right;
`;





 class Column extends React.Component {
    state={
        activeId:null,
        collum:{name:"",color:"", _id:""}
    }
    render() {
        return (
            <React.Fragment>
                <Dialog
                    isShown={this.state.activeId === this.props.column._id}
                    title="Edit column"
                    onCloseComplete={() => this.setState({ activeId: null })}
                    hasFooter={false}
                >
                    <Item>
                        <Title2>Name</Title2>
                        <TextInput
                            onChange={(e) =>
                                this.setState({
                                    collum: { ...this.state.collum, name: e.target.value },
                                })
                            }
                            value={this.state.collum.name}
                        />
                    </Item>
                    <Item>
                        <Title2>Color</Title2>
                        <ColorPicker
                            color={this.state.collum.color}
                            onChangeComplete={(color) =>
                                this.setState({
                                    collum: { ...this.state.collum, color: color },
                                })
                            }
                        />
                    </Item>
                    <Submit>
                        <Button
                            appearance="minimal"
                            intent="danger"
                            onClick={() => {
                                this.props.deleteColumn(this.state.collum._id);
                                this.setState({
                                    activeId: null,
                                    collum: { },
                                });
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            marginLeft={10}
                            appearance="minimal"
                            intent="success"
                            onClick={() => {
                                this.props.changeColumns(this.state.collum);
                                this.setState({
                                    activeId: null,
                                    collum: { },
                                });
                            }}
                        >
                            Save
                        </Button>

                    </Submit>
                </Dialog>
            <Draggable
                draggableId={this.props.column._id}
                index={this.props.index} 
            >
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>
                            {this.props.column.name}
                            <BsThreeDots
                                style={{float:"right"}}
                                cursor={"pointer"}
                                marginLeft={"1em"}
                                onClick={() => this.setState({
                                    activeId: this.props.column._id,
                                    collum:{
                                        _id:this.props.column._id,
                                        name:this.props.column.name,
                                        color:this.props.column.color
                                    }
                                })}
                            />

                        </Title>
                        <Droppable
                            droppableId={this.props.column._id}
                            isDropDisabled={this.props.isDropDisabled}
                            type="task"
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    color={this.props.column.color}
                                >
                                    {this.props.column.tasks.map((task ,index) =>
                                    <Task
                                        key={task._id}
                                        task={task}
                                        index={index}
                                    />
                                    )}

                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
            </React.Fragment>
        );
    }
}
export default connect(null,{changeColumns, deleteColumn})(Column)