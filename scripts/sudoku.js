class SudokuGame {
    constructor() {
      this.board = Array(9).fill().map(() => Array(9).fill(0));
      this.solution = Array(9).fill().map(() => Array(9).fill(0));
      this.initializeDOM();
      this.newGame('easy');
    }
  
    initializeDOM() {
      this.boardElement = document.getElementById('sudoku-board');
      this.newGameButton = document.getElementById('new-game');
      this.checkButton = document.getElementById('check-solution');
      this.messageElement = document.getElementById('message');
  
      this.newGameButton.addEventListener('click', () => {
        window.location.reload();
      });
      
      this.checkButton.addEventListener('click', () => this.checkSolution());
    }
  
    newGame(difficulty) {
      this.generateSolution();
      this.createPuzzle(difficulty);
      this.renderBoard();
    }
  
    generateSolution() {
      // Fill diagonal boxes first
      for (let box = 0; box < 9; box += 3) {
        this.fillBox(box, box);
      }
      // Solve the rest
      this.solveSudoku(this.solution);
    }
  
    fillBox(row, col) {
      const numbers = [1,2,3,4,5,6,7,8,9];
      this.shuffle(numbers);
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.solution[row + i][col + j] = numbers[i * 3 + j];
        }
      }
    }
  
    createPuzzle(difficulty) {
      const holes = {
        easy: 35,
        medium: 45,
        hard: 55
      }[difficulty];
  
      this.board = this.solution.map(row => [...row]);
      const positions = [];
      for (let i = 0; i < 81; i++) {
        positions.push(i);
      }
      this.shuffle(positions);
      
      for (let i = 0; i < holes; i++) {
        const pos = positions[i];
        const row = Math.floor(pos / 9);
        const col = pos % 9;
        this.board[row][col] = 0;
      }
    }
  
    renderBoard() {
      this.boardElement.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          if (j === 2 || j === 5) cell.className += ' border-right';
          if (i === 2 || i === 5) cell.className += ' border-bottom';
  
          if (this.board[i][j] !== 0) {
            cell.className += ' fixed';
            cell.textContent = this.board[i][j];
          } else {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.dataset.row = i;
            input.dataset.col = j;
            cell.appendChild(input);
          }
          
          this.boardElement.appendChild(cell);
        }
      }
    }
  
    checkSolution() {
      const current = this.board.map(row => [...row]);
      const inputs = document.querySelectorAll('input');
      let isComplete = true;
  
      inputs.forEach(input => {
        const value = parseInt(input.value);
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        
        if (!value || isNaN(value)) {
          isComplete = false;
        } else {
          current[row][col] = value;
        }
      });
      if (!isComplete) {
        this.messageElement.textContent = 'Please fill all cells!';
        return;
      }
      const correct = JSON.stringify(current) == JSON.stringify(this.solution);
      this.messageElement.textContent = correct ? 
        'Congratulations! Solution is correct!' : 
        'Solution is incorrect. Try again!';
    }
  
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    solveSudoku(grid) {
      const empty = this.findEmpty(grid);
      if (!empty) return true;
      
      const [row, col] = empty;
      for (let num = 1; num <= 9; num++) {
        if (this.isValid(grid, row, col, num)) {
          grid[row][col] = num;
          if (this.solveSudoku(grid)) return true;
          grid[row][col] = 0;
        }
      }
      return false;
    }
  
    findEmpty(grid) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (grid[i][j] === 0) return [i, j];
        }
      }
      return null;
    }
  
    isValid(grid, row, col, num) {
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
      }
      
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
      }
      
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[boxRow + i][boxCol + j] === num) return false;
        }
      }
      
      return true;
    }
  }
  
  // Initialize game
  new SudokuGame();