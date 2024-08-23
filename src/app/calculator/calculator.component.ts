import { Component, computed, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {
  firstOperand = signal('0');
  secondOperand = signal('0');
  operator = signal('');
  waitForSecondNumber = signal(false);
  display = computed(() => {
    if (this.waitForSecondNumber() && this.secondOperand() !== '0') {
      return this.secondOperand();
    }
    return this.firstOperand();
  });

  btnClick(value: string | number) {
    if (typeof value === 'string' && value !== '.') {
      this.handleOperator(value);
    } else if (typeof value === 'number' || value === '.') {
      this.handleNumber(value.toString());
    }
  }

  handleNumber(value: string) {
    if (!this.waitForSecondNumber()) {
      if (value === '.' && this.firstOperand().includes('.')) {
        return;
      }
      if (this.firstOperand() === '0' && value !== '.') {
        this.firstOperand.set(value);
      } else {
        this.firstOperand.set(this.firstOperand() + value);
      }
    } else {
      if (value === '.' && this.secondOperand().includes('.')) {
        return;
      }
      if (this.secondOperand() === '0' && value !== '.') {
        this.secondOperand.set(value);
      } else {
        this.secondOperand.set(this.secondOperand() + value);
      }
    }
  }

  handleOperator(value: string) {
    if (value === 'C') {
      this.clear();
      return;
    }
    if (!this.waitForSecondNumber()) {
      this.operator.set(value);
      this.waitForSecondNumber.set(true);
    }
  }

  clear() {
    this.firstOperand.set('0');
    this.secondOperand.set('0');
    this.operator.set('');
    this.waitForSecondNumber.set(false);
  }

  calculate() {
    let result = 0;
    const first = parseFloat(this.firstOperand());
    const second = parseFloat(this.secondOperand());
    switch (this.operator()) {
      case '/':
        result = first / second;
        break;
      case '*':
        result = first * second;
        break;
      case '-':
        result = first - second;
        break;
      case '+':
        result = first + second;
        break;
      default:
        result = 0;
        break;
    }

    this.firstOperand.set(result.toString());
    this.secondOperand.set('0');
    this.waitForSecondNumber.set(false);
    this.operator.set('');
  }
}
