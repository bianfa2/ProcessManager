import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyProcessService } from '../../services/myProcess/my-process.service';
import {
  Process,
  RoundRobinService,
} from '../../services/roundRobin/round-robin.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent implements OnInit {
  myProcessTitle: string[] = ['processName', 'timeArrival', 'burst'];
  myProcess: Process[] = [];
  readyProcess: Process[] = [];
  execProcess: Process[] = [];
  waitProcess: Process[] = [];
  finishProcess: Process[] = [];
  expulsiveProcessTitle: string[] = [
    'processName',
    'timeArrival',
    'burst',
    'priority',
    'turnaround',
    'finishTime',
  ];
  expulsiveProcess: Process[] = [
    {
      processName: '',
      timeArrival: '',
      burst: 0,
      priority: 0,
      turnaround: 0,
      finishTime: 0,
    },
  ];
  noExpulsiveProcessTitle: string[] = [
    'processName',
    'timeArrival',
    'burst',
    'priority',
    'turnaround',
    'finishTime',
  ];
  noExpulsiveProcess: Process[] = [
    {
      processName: '',
      timeArrival: '',
      burst: 0,
      priority: 0,
      turnaround: 0,
      finishTime: 0,
    },
  ];
  th = new FormControl(250);
  quantum = new FormControl(2);
  progressBar = 0;
  control = 0;
  firstRun = false;
  graph = [];

  // Graph
  lineChartOptions = {
    title: {
      display: true,
      text: 'Procesos vs Turnaround',
      fontSize: 30,
    },
    responsive: true,
  };
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartColors = [
    {
      borderColor: '#8e5ea2',
    },
  ];

  lineChartLabels = [];

  lineChartData = [
    {
      data: [],
      label: 'Turnaround',
    },
  ];

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
                burst: 0,
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
      this.expulsiveProcess = this.roundRobinService.generateReportsExpulsiveProcess(
        this.myProcess,
        this.quantum.value
      );
      this.noExpulsiveProcess = this.roundRobinService.generateReportsNoExpulsiveProcess(
        this.myProcess
      );
      setTimeout(() => {
        this.showGraph();
        this.runSimulate();
      }, 800);
    }

    if (!this.firstRun) {
      this.firstRun = true;
      this.expulsiveProcess = this.roundRobinService.generateReportsExpulsiveProcess(
        this.myProcess,
        this.quantum.value
      );
      this.noExpulsiveProcess = this.roundRobinService.generateReportsNoExpulsiveProcess(
        this.myProcess
      );
      this.showGraph();
    }

    this.control = value;
  }

  runSimulate() {
    this.setControl(1);
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
            : task.burst) * this.th.value;

        var progressTime = setInterval(() => {
          this.progressBar += 1.2;
          if (this.control != 1) {
            if (this.control === 3) {
              this.th.enable();
              this.quantum.enable();
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
            task.quantum +=
              task.burst > this.quantum.value
                ? 1
                : task.burst / this.quantum.value;
            task.burst = (task.burst - this.quantum.value).toString();
            if (task.burst > 0) {
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

  showGraph() {
    this.lineChartLabels = [];
    this.lineChartData[0]['data'] = [];

    this.myProcess.forEach((process) => {
      this.lineChartLabels.push(process.processName);
    });

    this.expulsiveProcess.forEach((process) => {
      this.lineChartData[0]['data'][process.timeArrival] = process.turnaround;
    });

    this.noExpulsiveProcess.forEach((process) => {
      this.lineChartData[0]['data'][process.timeArrival] = process.turnaround;
    });
  }
}
