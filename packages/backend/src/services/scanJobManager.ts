import { randomUUID } from "crypto";

export interface ScanJob {
  id: string;
  network: string;
  status: "pending" | "running" | "done" | "error";
  progress: number; // 0-100
  results: any[];
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

class ScanJobManager {
  private jobs: Map<string, ScanJob> = new Map();

  createJob(network: string): ScanJob {
    const job: ScanJob = {
      id: randomUUID(),
      network,
      status: "pending",
      progress: 0,
      results: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobs.set(job.id, job);
    return job;
  }

  updateJob(id: string, data: Partial<ScanJob>) {
    const job = this.jobs.get(id);
    if (!job) return;
    Object.assign(job, data, { updatedAt: new Date() });
  }

  getJob(id: string) {
    return this.jobs.get(id);
  }

  // Удаляем старые завершённые задачи старше часа
  cleanup() {
    const cutoff = Date.now() - 60 * 60 * 1000;
    for (const [id, job] of this.jobs) {
      if (job.status !== "running" && job.updatedAt.getTime() < cutoff) {
        this.jobs.delete(id);
      }
    }
  }
}

export const scanJobManager = new ScanJobManager();


