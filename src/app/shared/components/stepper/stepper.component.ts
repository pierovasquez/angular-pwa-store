import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  currentValue = 5;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.currentValue = this.currentValue + 1;
  }

  sub() {
    this.currentValue = this.currentValue - 1;
  }

}
