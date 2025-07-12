declare module "ping" {
  interface PingResult {
    alive: boolean;
    time: number;
    packetLoss?: string;
  }

  export const promise: {
    probe: (host: string, options?: any) => Promise<PingResult>;
  };
}
