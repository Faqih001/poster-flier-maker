
export interface Template {
  id: string;
  name: string;
  category: string;
  previewImage: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  layout: 'hero' | 'split' | 'minimal' | 'bold';
  elements: TemplateElement[];
}

export interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
}
