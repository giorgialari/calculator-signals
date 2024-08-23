import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CalculatorComponent } from './app/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent],
  template: `
    <app-calculator/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
