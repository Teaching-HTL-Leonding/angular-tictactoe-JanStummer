import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  WIDTH = 3;
  HEIGHT = 3;
  X_SYMBOL = '✖️';
  CIRCLE_SYMBOL = '⭕';
  LAST_SYMBOL = '⭕';
  gameOver = false;
  cells: string[][] = [];
  message = '';
  gridTemplateColumns = '';  // Variable für grid-template-columns

  constructor() {
    this.initBoard();
    this.gridTemplateColumns = `repeat(${this.WIDTH}, auto)`;  // Setze grid-template-columns dynamisch
  }

  initBoard(): void {
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = [];
      for (let x = 0; x < this.WIDTH; x++) {
        row.push('');  // Initialize the board with empty cells
      }
      this.cells.push(row);
    }
  }

  handleCellClick(x: number, y: number): void {
    if (this.gameOver) {
      return;
    }

    const cell = this.cells[y][x];

    if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT || cell !== '') {
      return;
    }

    if (this.LAST_SYMBOL === this.CIRCLE_SYMBOL) {
      this.cells[y][x] = this.X_SYMBOL;
      this.LAST_SYMBOL = this.X_SYMBOL;
      this.checkForWin(this.X_SYMBOL);
    } else {
      this.cells[y][x] = this.CIRCLE_SYMBOL;
      this.LAST_SYMBOL = this.CIRCLE_SYMBOL;
      this.checkForWin(this.CIRCLE_SYMBOL);
    }
  }

  checkForWin(symbol: string): void {
    // Check rows
    for (let y = 0; y < this.HEIGHT; y++) {
      let rowWin = true;
      for (let x = 0; x < this.WIDTH; x++) {
        if (this.cells[y][x] !== symbol) {
          rowWin = false;
        }
      }
      if (rowWin) {
        this.declareWinner(symbol);
        return;
      }
    }

    // Check columns
    for (let x = 0; x < this.WIDTH; x++) {
      let colWin = true;
      for (let y = 0; y < this.HEIGHT; y++) {
        if (this.cells[y][x] !== symbol) {
          colWin = false;
        }
      }
      if (colWin) {
        this.declareWinner(symbol);
        return;
      }
    }

    // Check diagonals
    let diagonalWin1 = true;
    let diagonalWin2 = true;
    for (let i = 0; i < this.WIDTH; i++) {
      if (this.cells[i][i] !== symbol) {
        diagonalWin1 = false;
      }
      if (this.cells[i][this.WIDTH - i - 1] !== symbol) {
        diagonalWin2 = false;
      }
    }
    if (diagonalWin1 || diagonalWin2) {
      this.declareWinner(symbol);
    }
  }

  declareWinner(symbol: string): void {
    this.message = `Player ${symbol === this.X_SYMBOL ? '✖️' : '⭕'} wins!`;
    this.gameOver = true;
  }
}
