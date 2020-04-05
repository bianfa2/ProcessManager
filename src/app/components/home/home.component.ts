import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import MyProcessService from '../../services/myProcess/my-process.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selected: string = '0';
  system: string = '0';
  nProcess = new FormControl('1');
  displayedColumns: string[] = [
    'pid',
    'processName',
    'userName',
    'memoryUsage',
    'cpuTime',
  ];
  myProcess: Process[] = [
    {
      pid: '12',
      processName: 'Zula.exec',
      userName: 'bianfa',
      memoryUsage: '12 KB',
      cpuTime: '00:02',
    },
  ];
  simulate = this.myProcess.length > 0;

  constructor(public myProcessService: MyProcessService) {
    this.myProcessService.getByMemory();
  }

  ngOnInit(): void {}

  getMyProcess() {
    console.log(this.nProcess.value);
  }
}

export interface Process {
  pid: string;
  processName: string;
  userName: string;
  memoryUsage: string;
  cpuTime: string;
}
