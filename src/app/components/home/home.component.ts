import { Component, OnInit } from '@angular/core';
import MyProcessService from '../../services/myProcess/my-process.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public myProcessService: MyProcessService) {
    this.myProcessService.getByMemory();
  }

  ngOnInit(): void {}
}
