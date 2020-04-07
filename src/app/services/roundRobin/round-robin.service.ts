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
