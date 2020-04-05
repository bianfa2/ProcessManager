import { Injectable } from '@angular/core';
import { MyProcess } from '../myProcess/my-process.service';

@Injectable({
  providedIn: 'root',
})
export class RoundRobinService {
  process: Process[];

  constructor() {}

  setMyProcess(myProcess: MyProcess[]) {
    return new Promise((resolve, reject) => {
      this.process = [];

      myProcess.forEach((item, index) => {
        this.process.push({
          processName: item.processName,
          timeArrival: (index + 1).toString(),
          burst: item.processName.length.toString(),
        });
      });
      resolve();
    });
  }
}

export interface Process {
  processName: string;
  timeArrival: string;
  burst: string;
}
