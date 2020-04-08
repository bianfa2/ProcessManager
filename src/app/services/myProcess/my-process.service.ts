import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyProcessService {
  process: MyProcess[] = [];

  constructor(public httpClient: HttpClient) {}

  setProcess(process: MyProcess[]) {
    this.process = process;
  }

  getByMemory(nProcess: number) {
    return this.httpClient.get<MyProcess[]>(
      `http://192.168.0.33:3000/api/data/processNumber=${nProcess}/flag=1`
    );
  }

  getByCPU(nProcess: number) {
    return this.httpClient.get<MyProcess[]>(
      `http://192.168.0.33:3000/api/data/processNumber=${nProcess}/flag=0`
    );
  }
}

export interface MyProcess {
  pid: string;
  processName: string;
  userName: string;
  memoryUsage: string;
  cpuTime: string;
  priority: number;
}
