// Type definitions for Azure AI modules

declare module "@azure/core-auth" {
  export class AzureKeyCredential {
    constructor(key: string);
  }
}

declare module "@azure-rest/ai-inference" {
  export default class ModelClient {
    constructor(endpoint: string, credential: any, options?: any);
    path(path: string): {
      post(options: {
        body: {
          messages: Array<{
            role: string;
            content: string;
          }>;
          max_tokens?: number;
          temperature?: number;
          model?: string;
        };
      }): Promise<{
        status: string;
        body: {
          choices: Array<{
            message: {
              content: string;
            };
          }>;
        };
      }>;
    };
  }
}
