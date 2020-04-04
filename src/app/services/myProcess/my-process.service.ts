import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class MyProcessService {
  constructor() {}

  getByMemory() {
    console.log('hola');
  }
}
