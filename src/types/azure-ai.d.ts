// Type definitions for Azure AI libraries

declare module '@azure-rest/ai-inference' {
  export interface ModelClientOptions {
    key?: string;
    credentials?: {
      scopes: string[];
    };
  }

  export interface ChatMessage {
    role: string;
    content: string;
  }

  export interface ChatCompletionsOptions {
    messages: ChatMessage[];
    max_tokens: number;
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    model: string;
  }

  export interface ChatCompletionsResponse {
    status: string;
    body: {
      choices: Array<{
        message: {
          role: string;
          content: string;
        };
        index: number;
      }>;
    };
  }

  export default class ModelClient {
    constructor(endpoint: string, credential: any, options?: ModelClientOptions);
    constructor(endpoint: string, options: ModelClientOptions);
    
    path(path: string): {
      post(options: { body: ChatCompletionsOptions }): Promise<ChatCompletionsResponse>;
    };
  }
}

declare module '@azure/identity' {
  export class DefaultAzureCredential {
    constructor(options?: any);
  }
}
