import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
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

export default class Task extends React.Component {
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
                        {this.props.task.name}
                    </Container>
                )}
            </Draggable>
        );
    }
}