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
          burst: item.processName.length.toString(),
          quantum:
            item.priority === 0
              ? item.processName.length % quantum == 0
                ? item.processName.length / quantum
                : Math.trunc(item.processName.length / quantum) + 1
              : 0,
          nExec: 0,
        });
      });
      resolve();
    });
  }
}

export interface Process {
  pid: string;
  processName: string;
  priority: number;
  timeArrival: string;
  burst: string;
  quantum: number;
  nExec: number;
}
