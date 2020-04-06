import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyProcessService } from '../../services/myProcess/my-process.service';
import {
  Process,
  RoundRobinService,
} from '../../services/roundRobin/round-robin.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent implements OnInit {
  displayedColumns: string[] = ['processName', 'timeArrival', 'burst'];
  myProcess: Process[];
  readyProcess: Process[];
  th = new FormControl('1');
  quantum = new FormControl('2');

  constructor(
    public roundRobinService: RoundRobinService,
    public myProcessService: MyProcessService
  ) {}

  ngOnInit(): void {
    this.roundRobinService
      .setMyProcess(this.myProcessService.process)
      .then(() => {
        this.roundRobinService.process.length > 0
          ? ((this.myProcess = this.roundRobinService.process),
            (this.readyProcess = this.roundRobinService.process))
          : (this.myProcess = [
              {
                pid: '',
                processName: '',
                priority: 0,
                timeArrival: '',
                burst: '',
                quantum: 0,
                nExec: 0,
              },
            ]);
      });
  }
}
