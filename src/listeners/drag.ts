import { Coords, State } from "../../types";
import { addCoords, subtractCoords } from "../utils";

const dragHoc = (state: State, onDrag: () => void) => {
  let lastCameraOrigin: Coords; // need this because browsers send bad coords sometimes
  let isDrawing = false;
  let clickOrigin: Coords;
  let cameraOrigin: Coords;
  const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

  canvas.addEventListener('mousedown', function(evt) {
    isDrawing = true;
    clickOrigin = { x: evt.clientX, y: evt.clientY };
    cameraOrigin = {...state.camera.origin}
  })

  canvas.addEventListener('mousemove', (evt) => {
    if (!isDrawing) {
      return;
    }

    const clickCoords: Coords = {
      x: evt.clientX,
      y: evt.clientY
    }

    const transposition: Coords = subtractCoords(clickCoords, clickOrigin);
    lastCameraOrigin = state.camera.origin;
    state.camera.origin = addCoords(cameraOrigin, transposition);

    onDrag();
  })

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    state.camera.origin = lastCameraOrigin;
  })
}

export default dragHoc;