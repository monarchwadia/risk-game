import { SQUARE_HEIGHT, SQUARE_WIDTH } from "./constants";

const resize = () => {
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  if(!canvas) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute("height", "" + height )
  canvas.setAttribute("width", "" + width )
}

export default resize;