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

  getByMemory() {
    return this.httpClient.get<MyProcess[]>(
      'http://192.168.0.33:3000/api/data/processNumber=5/flag=1'
    );

    /* this.process = [
      {
        pid: '4',
        processName: 'chrome.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '15 KB',
        cpuTime: '0:00:13',
      },
      {
        pid: '20',
        processName: 'word.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '17.524 KB',
        cpuTime: '0:00:11',
      },
      {
        pid: '3',
        processName: 'Zula.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '10 KB',
        cpuTime: '0:00:13',
      },
      {
        pid: '15',
        processName: 'discord.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '5 KB',
        cpuTime: '0:00:11',
      },
    ];

    return this.process; */
  }

  getByCPU() {
    this.process = [
      {
        pid: '0',
        processName: 'System Idle Process',
        userName: 'NT AUTHORITY\\SYSTEM',
        memoryUsage: '8 KB',
        cpuTime: '28:03:14',
        priority: 1,
      },
      {
        pid: '4',
        processName: 'System',
        userName: 'N/D',
        memoryUsage: '388 KB',
        cpuTime: '2:14:03',
        priority: 1,
      },
      {
        pid: '2704',
        processName: 'Code.exe',
        userName: 'DESKTOP-A54H9IH\\jgabr',
        memoryUsage: '177.976 KB',
        cpuTime: '0:24:08',
        priority: 0,
      },
      {
        pid: '18892',
        processName: 'node.exe',
        userName: 'DESKTOP-A54H9IH\\jgabr',
        memoryUsage: '81.900 KB',
        cpuTime: '0:21:25',
        priority: 0,
      },
      {
        pid: '4352',
        processName: 'chromes.exe',
        userName: 'DESKTOP-A54H9IH\\jgabr',
        memoryUsage: '91.828 KB',
        cpuTime: '0:16:44',
        priority: 0,
      },
    ];

    return this.process;
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
