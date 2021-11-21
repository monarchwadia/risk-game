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
    state.camera.origin = subtractCoords(cameraOrigin, transposition);

    onDrag();
  })

  canvas.addEventListener('wheel', (evt) => {
    console.log('wheel event triggered');
    const event = evt as unknown as WheelEvent;
    
    evt.preventDefault();
    // const SCALER = 5;
    // const diff = Math.round(event.deltaY / SCALER);
    const diff = event.deltaY === 0 
      ? 0 
      : event.deltaY > 0
        ? 1
        : -1;

      
    state.camera.zoom = Math.min(Math.max(state.camera.zoom + diff, 3), 7);
    // state.camera.origin.x += diff / 2;
    // state.camera.origin.y += diff / 2;


    onDrag()
  })

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    state.camera.origin = lastCameraOrigin;
  })
}

export default dragHoc;