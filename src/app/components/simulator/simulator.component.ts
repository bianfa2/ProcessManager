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
  myProcess: Process[] = [];
  readyProcess: Process[] = [];
  execProcess: Process[] = [];
  waitProcess: Process[] = [];
  finishProcess: Process[] = [];
  th = new FormControl(250);
  quantum = new FormControl(2);
  progressBar = 0;

  constructor(
    public roundRobinService: RoundRobinService,
    public myProcessService: MyProcessService
  ) {}

  ngOnInit(): void {
    this.createSimulate();
  }

  createSimulate() {
    this.roundRobinService
      .setMyProcess(this.myProcessService.process, this.quantum.value)
      .then(() => {
        this.roundRobinService.process.length > 0
          ? ((this.myProcess = this.roundRobinService.process.slice()),
            (this.readyProcess = this.myProcess.slice()))
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

  runSimulate() {
    this.th.disable();
    this.quantum.disable();
    if (this.execProcess.length === 0) {
      var task;

      if (this.readyProcess[0].nExec === 0) {
        task = {
          ...this.readyProcess[0],
        };
        this.readyProcess.splice(0, 1);
        this.execProcess.push(task);
      } else if (this.waitProcess.length > 0) {
        task = {
          ...this.waitProcess[0],
        };
        this.waitProcess.splice(0, 1);
        this.execProcess.push(task);
      } else {
        this.th.enable();
        this.quantum.enable();
        return;
      }

      if (task != null) {
        const progressBarChange =
          (task.priority === 0
            ? this.quantum.value > task.burst
              ? this.quantum.value
              : task.burst
            : parseInt(task.burst)) * this.th.value;

        var progressTime = setInterval(() => {
          this.progressBar += 1.2;
        }, progressBarChange / 100);

        setTimeout(() => {
          clearInterval(progressTime);
          this.progressBar = 0;
          task.nExec += 1;
          this.execProcess.splice(0, 1);

          if (task.priority === 0) {
            task.quantum -= 1;
            task.burst = (parseInt(task.burst) - this.quantum.value).toString();
            if (parseInt(task.burst) > 0) {
              this.waitProcess.push(task);
            } else {
              this.finishProcess.push(task);
            }
          } else {
            this.readyProcess.push(task);
          }

          setTimeout(() => {
            this.runSimulate();
          }, 250);
        }, progressBarChange);
      }
    }
  }

  changeQuantum() {
    this.createSimulate();
  }
}
