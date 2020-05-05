import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 40px;
  height: 40px;
  background: ${(props) => (props.background ? props.background : "white")};
  margin: 0 5px 5px 0;
  border-radius: 5px;
  border: none;
  box-shadow: ${(props) =>
    props.background === props.color ? "0px 0px 5px" + props.color : "none"};
`;

class ColorPicker extends Component {
  state = {
    colors: [
      "#FF6900",
      "#FCB900",
      "#7BDCB5",
      "#00D084",
      "#8ED1FC",
      "#0693E3",
      "#ABB8C3",
      "#EB144C",
      "#F78DA7",
      "#9900EF",
    ],
  };
  render() {
    return this.state.colors.map((color) => (
      <Button
        color={this.props.color}
        background={color}
        onClick={(e) => {
          this.props.onChangeComplete(color);
        }}
      />
    ));
  }
}

export default ColorPicker;
