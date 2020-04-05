import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyProcessService {
  process: MyProcess[] = [];

  constructor() {}

  getByMemory() {
    this.process = [
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

    return this.process;
  }

  getByCPU() {
    this.process = [
      {
        pid: '3',
        processName: 'Zula.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '10 KB',
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
        pid: '15',
        processName: 'discord.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '5 KB',
        cpuTime: '0:00:11',
      },
      {
        pid: '4',
        processName: 'chrome.exe',
        userName: 'DESKTOP-NTR1UBE/Fabian',
        memoryUsage: '15 KB',
        cpuTime: '0:00:13',
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
}
