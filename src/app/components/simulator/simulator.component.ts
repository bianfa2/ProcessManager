import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent implements OnInit {
  displayedColumns: string[] = ['processName', 'timeArrival', 'burst'];
  myProcess: Process[] = [
    {
      processName: 'Zula.exec',
      timeArrival: '1',
      burst: '10',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

export interface Process {
  processName: string;
  timeArrival: string;
  burst: string;
}
