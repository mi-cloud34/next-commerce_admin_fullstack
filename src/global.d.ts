declare module "html-pdf-node" {
    export function create(
      file: { content: string },
      options?: { format: string }
    ): {
      toBuffer: (callback: (err: any, buffer: Buffer) => void) => void;
    };
  }
  