// Element types for the editor
export interface BaseElement {
  id: string;
  type: string;
  x: number;
  y: number;
  draggable?: boolean;
}

export interface RectElement extends BaseElement {
  type: 'rect';
  width: number;
  height: number;
  fill: string;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontStyle: string;
  fill: string;
  width: number;
  align: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  width: number;
  height: number;
}

export type EditorElement = RectElement | TextElement | ImageElement;

export interface Template {
  id: number;
  name: string;
  width: number;
  height: number;
  background: string;
  elements: EditorElement[];
}
