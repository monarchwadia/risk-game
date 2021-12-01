type DefaultProps = {
  canvas: HTMLCanvasElement,
}
export type Component<T = unknown> = (props: T & DefaultProps) => void;


