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
  control = 0;

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

  setControl(value) {
    if (this.control === 4 && value === 2) {
      this.progressBar = 0;
      this.execProcess = [];
      this.waitProcess = [];
      this.finishProcess = [];
      this.readyProcess = this.myProcess.slice();
      setTimeout(() => {
        console.log(this.readyProcess);
        this.runSimulate();
      }, 800);
    }
    this.control = value;
  }

  runSimulate() {
    this.control = 1;
    this.th.disable();
    this.quantum.disable();

    if (this.execProcess.length === 0) {
      var task;
      var flag = 1;

      if (this.readyProcess.length > 0) {
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
        this.control = 4;
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
          if (this.control != 1) {
            if (this.control === 3) {
              this.control = 4;
            } else if (this.control === 2) {
              this.progressBar = 0;
              this.execProcess = [];
              this.waitProcess = [];
              this.finishProcess = [];
              this.readyProcess = this.myProcess.slice();
              setTimeout(() => {
                this.runSimulate();
              }, 500);
            }
            flag = 0;
            clearTimeout(progressTime);
            return;
          }
        }, progressBarChange / 100);

        setTimeout(() => {
          if (flag !== 1) {
            return;
          }
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
            this.finishProcess.push(task);
          }

          /* if (this.control === 3) {
            this.control = 0;
            return;
          } else if (this.control === 2) {
            this.execProcess = [];
            this.waitProcess = [];
            this.finishProcess = [];
            this.readyProcess = this.myProcess.slice();
          } */

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
