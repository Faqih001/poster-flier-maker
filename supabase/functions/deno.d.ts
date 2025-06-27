// Type definitions for Deno edge functions

declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    toObject(): Record<string, string>;
  }
  
  export const env: Env;
}

declare module "https://deno.land/std@0.190.0/http/server.ts" {
  export function serve(handler: (req: Request) => Response | Promise<Response>): void;
}

declare module "npm:resend@2.0.0" {
  export class Resend {
    constructor(apiKey: string);
    
    emails: {
      send(options: {
        from: string;
        to: string[];
        subject: string;
        html?: string;
        text?: string;
        attachments?: any[];
        tags?: any[];
      }): Promise<any>;
    };
  }
}
