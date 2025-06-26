'use client';

import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text as KonvaText } from 'react-konva';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Slider } from './slider';
import { Textarea } from './textarea';
import { 
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, 
  Image, Type, Layers, Download, Undo, Redo,
  Plus, Minus, Save
} from 'lucide-react';

// Define types
interface TextElement {
  id: string;
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontStyle: string;
  fill: string;
  width: number;
  align: string;
  draggable?: boolean;
}

interface RectElement {
  id: string;
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  draggable?: boolean;
}

interface ImageElement {
  id: string;
  type: 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  draggable?: boolean;
}

type EditorElement = TextElement | RectElement | ImageElement;

interface Template {
  id: number;
  name: string;
  width: number;
  height: number;
  background: string;
  elements: EditorElement[];
}

interface SearchParams {
  template?: string;
}

// Demo templates - In a real app, these would come from the database
const templates: Template[] = [
  {
    id: 1,
    name: "Business Promotion",
    width: 800,
    height: 1200,
    background: "#ffffff",
    elements: []
  },
  // More templates would be defined here
];

export default function EditorPage({ searchParams }: { searchParams: SearchParams }) {
  const templateId = searchParams?.template || "1";
  const template = templates.find(t => t.id === Number(templateId)) || templates[0];
  
  const stageRef = useRef<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [history, setHistory] = useState<EditorElement[][]>([]);
  const [historyStep, setHistoryStep] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  
  // Track history for undo/redo
  const updateHistory = (newElements: EditorElement[]) => {
    const newHistory = [...history.slice(0, historyStep + 1), newElements];
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  // Initialize with template
  useEffect(() => {
    // In a real app, we would fetch the template data
    const initialElements: EditorElement[] = [
      {
        id: 'background',
        type: 'rect',
        x: 0,
        y: 0,
        width: template.width,
        height: template.height,
        fill: template.background,
      },
      {
        id: 'title',
        type: 'text',
        x: 100,
        y: 100,
        text: 'Your Business Name',
        fontSize: 36,
        fontStyle: 'bold',
        fill: '#333',
        width: 600,
        align: 'center',
      },
      {
        id: 'subtitle',
        type: 'text',
        x: 150,
        y: 200,
        text: 'Promotional Offer or Event Details',
        fontSize: 24,
        fontStyle: 'normal',
        fill: '#555',
        width: 500,
        align: 'center',
      }
    ];
    
    setElements(initialElements);
    
    // Add initial state to history
    updateHistory(initialElements);
  }, [template]);

  // Add new text element
  const addText = () => {
    const newTextElement: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 150,
      y: 300,
      text: 'Click to edit text',
      fontSize: 20,
      fontStyle: 'normal',
      fill: '#333',
      width: 500,
      align: 'left',
      draggable: true,
    };
    
    const newElements = [...elements, newTextElement];
    setElements(newElements);
    updateHistory(newElements);
    setSelectedId(newTextElement.id);
  };

  // Update text properties
  const updateTextProperty = (id: string, property: string, value: string | number) => {
    const newElements = elements.map(el => {
      if (el.id === id && el.type === 'text') {
        return { ...el, [property]: value };
      }
      return el;
    });
    
    setElements(newElements);
    updateHistory(newElements);
  };

  // Delete an element
  const deleteElement = (id: string) => {
    if (id === 'background') return; // Don't allow background deletion
    
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    updateHistory(newElements);
    setSelectedId(null);
  };

  // Handle element position changes
  const handleElementDrag = (e: { target: { x: () => number; y: () => number } }, id: string) => {
    const element = elements.find(el => el.id === id);
    if (!element) return;
    
    const newElements = elements.map(el => {
      if (el.id === id) {
        return { 
          ...el,
          x: e.target.x(),
          y: e.target.y()
        };
      }
      return el;
    });
    
    setElements(newElements);
  };

  // Handle element drag end to update history
  const handleDragEnd = () => {
    updateHistory(elements);
  };

  // Generate AI text based on the prompt
  const generateAIText = async (prompt: string) => {
    try {
      const response = await fetch('/api/gemini/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate text');
      }
      
      const data = await response.json();
      
      if (selectedId && elements.find(el => el.id === selectedId && el.type === 'text')) {
        updateTextProperty(selectedId, 'text', data.text);
      } else {
        const newTextElement: TextElement = {
          id: `ai-text-${Date.now()}`,
          type: 'text',
          x: 150,
          y: 300,
          text: data.text,
          fontSize: 20,
          fontStyle: 'normal',
          fill: '#333',
          width: 500,
          align: 'left',
        };
        
        const newElements = [...elements, newTextElement];
        setElements(newElements);
        updateHistory(newElements);
        setSelectedId(newTextElement.id);
      }
    } catch (error) {
      console.error('Error generating text:', error);
      // Display an error message to the user
    }
  };

  // Export to image
  const exportToImage = () => {
    if (!stageRef.current) return;
    
    const dataURL = stageRef.current.toDataURL();
    
    // Create download link
    const link = document.createElement('a');
    link.download = `poster-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Undo/Redo
  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setElements(history[historyStep - 1]);
      setSelectedId(null);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setElements(history[historyStep + 1]);
      setSelectedId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">PosterPro Editor</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={exportToImage}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Tools Sidebar */}
        <aside className="w-64 bg-white border-r p-4">
          <Tabs defaultValue="elements">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Elements Tab */}
            <TabsContent value="elements" className="space-y-4 mt-4">
              <Button onClick={addText} className="w-full">
                <Type className="w-4 h-4 mr-2" />
                Add Text
              </Button>
              
              {/* AI Text Generation */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Generate AI Text</h3>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Enter prompt for AI text generation..." 
                    className="w-full"
                    id="ai-prompt"
                  />
                  <Button 
                    onClick={() => {
                      const prompt = (document.getElementById('ai-prompt') as HTMLTextAreaElement).value;
                      if (prompt) {
                        generateAIText(prompt);
                      }
                    }} 
                    className="w-full"
                  >
                    Generate Text
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button onClick={undo} disabled={historyStep <= 0} className="w-1/2" variant="outline">
                  <Undo className="w-4 h-4 mr-2" />
                  Undo
                </Button>
                <Button onClick={redo} disabled={historyStep >= history.length - 1} className="w-1/2" variant="outline">
                  <Redo className="w-4 h-4 mr-2" />
                  Redo
                </Button>
              </div>
            </TabsContent>
            
            {/* Text Tab - Only shown when a text element is selected */}
            <TabsContent value="text" className="space-y-4 mt-4">
              {selectedId && elements.find(el => el.id === selectedId && el.type === 'text') && (
                <div className="space-y-4">
                  {/* Text content editor */}
                  <Textarea 
                    value={(elements.find(el => el.id === selectedId) as TextElement)?.text || ''} 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateTextProperty(selectedId, 'text', e.target.value)} 
                    placeholder="Enter text..." 
                    className="w-full"
                  />
                  
                  {/* Text controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Font Size</label>
                      <div className="flex items-center gap-2">
                        <span>{(elements.find(el => el.id === selectedId) as TextElement)?.fontSize || 16}</span>
                        <Slider 
                          defaultValue={[(elements.find(el => el.id === selectedId) as TextElement)?.fontSize || 16]} 
                          min={8} 
                          max={72} 
                          step={1} 
                          onValueChange={(value: number[]) => updateTextProperty(selectedId, 'fontSize', value[0])} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Style</label>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={
                            (elements.find(el => el.id === selectedId) as TextElement)?.fontStyle?.includes('bold') 
                              ? 'bg-primary text-white' 
                              : ''
                          }
                          onClick={() => {
                            const currentStyle = (elements.find(el => el.id === selectedId) as TextElement)?.fontStyle || '';
                            const newStyle = currentStyle.includes('bold') 
                              ? currentStyle.replace('bold', '').trim() 
                              : `${currentStyle} bold`.trim();
                            updateTextProperty(selectedId, 'fontStyle', newStyle);
                          }}
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={
                            (elements.find(el => el.id === selectedId) as TextElement)?.fontStyle?.includes('italic') 
                              ? 'bg-primary text-white' 
                              : ''
                          }
                          onClick={() => {
                            const currentStyle = (elements.find(el => el.id === selectedId) as TextElement)?.fontStyle || '';
                            const newStyle = currentStyle.includes('italic') 
                              ? currentStyle.replace('italic', '').trim() 
                              : `${currentStyle} italic`.trim();
                            updateTextProperty(selectedId, 'fontStyle', newStyle);
                          }}
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Alignment</label>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={(elements.find(el => el.id === selectedId) as TextElement)?.align === 'left' ? 'bg-primary text-white' : ''}
                          onClick={() => updateTextProperty(selectedId, 'align', 'left')}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={(elements.find(el => el.id === selectedId) as TextElement)?.align === 'center' ? 'bg-primary text-white' : ''}
                          onClick={() => updateTextProperty(selectedId, 'align', 'center')}
                        >
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={(elements.find(el => el.id === selectedId) as TextElement)?.align === 'right' ? 'bg-primary text-white' : ''}
                          onClick={() => updateTextProperty(selectedId, 'align', 'right')}
                        >
                          <AlignRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Color</label>
                      <input 
                        type="color" 
                        value={(elements.find(el => el.id === selectedId) as TextElement)?.fill || '#000000'} 
                        onChange={(e) => updateTextProperty(selectedId, 'fill', e.target.value)} 
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Button 
                        variant="destructive" 
                        onClick={() => deleteElement(selectedId)}
                        size="sm"
                        className="mt-4"
                      >
                        Delete Element
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Canvas Zoom</label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </aside>
        
        {/* Canvas Area */}
        <main className="flex-1 bg-gray-100 flex justify-center items-center p-8 overflow-auto">
          <div 
            className="border shadow-lg bg-white" 
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'center',
              width: template.width,
              height: template.height 
            }}
          >
            <Stage 
              width={template.width} 
              height={template.height}
              ref={stageRef}
              onClick={(e) => {
                if (e.target === e.target.getStage()) {
                  setSelectedId(null);
                }
              }}
            >
              <Layer>
                {elements.map((element) => {
                  if (element.type === 'rect') {
                    const rect = element as RectElement;
                    return (
                      <Rect
                        key={rect.id}
                        id={rect.id}
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill={rect.fill}
                        onClick={() => setSelectedId(rect.id)}
                        draggable={rect.draggable || false}
                        onDragMove={(e) => handleElementDrag(e, rect.id)}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  }
                  
                  if (element.type === 'text') {
                    const text = element as TextElement;
                    return (
                      <KonvaText
                        key={text.id}
                        id={text.id}
                        x={text.x}
                        y={text.y}
                        text={text.text}
                        fontSize={text.fontSize}
                        fontStyle={text.fontStyle}
                        fill={text.fill}
                        width={text.width}
                        align={text.align}
                        onClick={() => setSelectedId(text.id)}
                        onTap={() => setSelectedId(text.id)}
                        draggable={text.draggable || true}
                        onDragMove={(e) => handleElementDrag(e, text.id)}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  }
                  
                  return null;
                })}
              </Layer>
            </Stage>
          </div>
        </main>
      </div>
    </div>
  );
}
