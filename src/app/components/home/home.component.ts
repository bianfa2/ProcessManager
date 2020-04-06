import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MyProcess,
  MyProcessService,
} from '../../services/myProcess/my-process.service';

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
  myProcess: MyProcess[];
  simulate = false;

  constructor(public myProcessService: MyProcessService) {}

  ngOnInit(): void {
    this.myProcessService.process.length > 0
      ? ((this.myProcess = this.myProcessService.process),
        (this.simulate = true))
      : (this.myProcess = [
          {
            pid: '',
            processName: '',
            priority: 0,
            userName: '',
            memoryUsage: '',
            cpuTime: '',
          },
        ]);
  }

  getMyProcess() {
    this.selected == '0'
      ? this.myProcessService.getByMemory().subscribe((data) => {
          this.myProcess = data;
          this.myProcessService.setProcess(data);
        })
      : (this.myProcess = this.myProcessService.getByCPU());

    this.simulate = true;
  }
}
