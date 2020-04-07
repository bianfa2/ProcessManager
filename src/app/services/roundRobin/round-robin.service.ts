import { Injectable } from '@angular/core';
import { MyProcess } from '../myProcess/my-process.service';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService {
  process: Process[];

  constructor() {}

  setMyProcess(myProcess: MyProcess[], quantum: number) {
    return new Promise((resolve, reject) => {
      this.process = [];

      myProcess.forEach((item, index) => {
        this.process.push({
          pid: item.pid,
          processName: item.processName,
          priority: item.priority,
          timeArrival: index.toString(),
          burst: parseInt(item.processName.length.toString()),
          quantum: 0,
          nExec: 0,
        });
      });
      resolve();
    });
  }

  generateReportsExpulsiveProcess(process: Process[], quantum: number) {
    var expulsiveProcess: Process[] = [];
    process.forEach((process) => {
      if (process.priority === 0) {
        expulsiveProcess.push({
          processName: process.processName,
          timeArrival: process.timeArrival,
          burst: process.burst,
          priority: process.priority,
          turnaround:
            this.getFinishTime(process.burst, quantum) -
            parseInt(process.timeArrival),
          finishTime: this.getFinishTime(process.burst, quantum),
        });
      }
    });
    return expulsiveProcess;
  }

  generateReportsNoExpulsiveProcess(process: Process[]) {
    var noExpulsiveProcess: Process[] = [];
    process.forEach((process) => {
      if (process.priority === 1) {
        noExpulsiveProcess.push({
          processName: process.processName,
          timeArrival: process.timeArrival,
          burst: process.burst,
          priority: process.priority,
          turnaround: process.burst - parseInt(process.timeArrival),
          finishTime: process.burst,
        });
      }
    });
    return noExpulsiveProcess;
  }

  getFinishTime(burst, quantum): number {
    return burst % quantum === 0
      ? (burst / quantum) * quantum
      : (Math.trunc(burst / quantum) + 1) * (burst / quantum);
  }
}

export interface Process {
  pid?: string;
  processName: string;
  priority: number;
  timeArrival: string;
  burst: number;
  quantum?: number;
  nExec?: number;
  turnaround?: number;
  finishTime?: number;
}
