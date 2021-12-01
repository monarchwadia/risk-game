import { Component } from "./component.type";

const clearCanvas: Component = ({ canvas }) => {
  const ctx = canvas.getContext('2d');
  ctx?.clearRect(0,0,canvas.width, canvas.height);
}

export default clearCanvas;