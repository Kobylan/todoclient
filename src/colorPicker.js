import React, { Component } from "react";
import styled from "styled-components";

function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

const Button = styled.button`
  width: 40px;
  height: 40px;
  background: ${(props) => (props.background ? props.background : "white")};
  margin: 0 5px 5px 0;
  border-radius: 5px;
  border: none;
  box-shadow: ${(props) =>
    props.background === props.color
      ? "0px 0px 5px" + LightenDarkenColor(props.color, -20)
      : "none"};
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
      "#FFFFFF",
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
