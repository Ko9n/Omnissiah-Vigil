declare module "ping" {
  export interface PingResponse {
    alive: boolean;
    time: number | string;
    min?: string;
    max?: string;
    avg?: string;
    stddev?: string;
    host?: string;
    numeric_host?: string;
  }

  export interface PingConfig {
    timeout?: number;
    extra?: string[];
  }

  export const promise: {
    probe(host: string, config?: PingConfig): Promise<PingResponse>;
  };

  export const sys: {
    probe(
      host: string,
      config?: PingConfig,
      callback: (isAlive: boolean, error?: any) => void
    ): void;
  };
}
