
    // 1) Define required constants
const colors = {
    null: 'transparent',
    '1': 'blue',
    '-1': 'red'
  };
  
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  // 2) Define required variables
  let board = [null, null, null, null, null, null, null, null, null];
  let turn = 1;
  let winner = null;
  
  // 3) Store elements on the page
  const squares = [...document.querySelectorAll('#board > div')];
  const message = document.querySelector('h1');
  const replayButton = document.querySelector('button');
  
  // 4) Initialize the app upon loading
  init()
  
  function init() {
    // 4.1) Initialize the state variables
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
  
    // 4.2) Render the state variables to the page
    renderBoard();
    renderMessage();
    
    // 5) Handle a player clicking a square
    squares.forEach(function(square) {
        square.addEventListener('click', handleSquareClick)
    });
    
    // 6) Handle a player clicking the replay button
    replayButton.addEventListener('click', init);
  }

  function renderBoard() {
    squares.forEach(function(square, index) {
      square.style.backgroundColor = colors[board[index]];
    });
  }
  
  // Helper function to render the message
  function renderMessage() {
    if (winner !== null) {
      if (winner === 'T') {
        message.textContent = "It's a tie!";
      } else {
        const playerColor = colors[winner].toUpperCase();
        message.textContent = `Player ${playerColor} wins!`;
      }
    } else {
      const playerColor = colors[turn].toUpperCase();
      message.textContent = `Player ${playerColor}'s turn`;
    }
  }
  
  function handleSquareClick(event) {
    const clickedIndex = squares.findIndex(function(square) {
        return square === event.target
    })
    
    // 5.2) Check if the square is already taken
    if (board[clickedIndex] !== null) {
      return;
    }
    
    // 5.3) Check if the game is over
    if (winner !== null) {
      return;
    }
    
    // 5.4) Update the board with the current player's turn
    board[clickedIndex] = turn;
    
    // 5.5) Flip turns
    turn *= -1;
    
    // 5.6) Check for a winner
    for (const combination of winningCombinations) {
      const total = board[combination[0]] + board[combination[1]] + board[combination[2]];
      //math.abs to turn -3 to 3
      const absoluteTotal = Math.abs(total);
      
      if (absoluteTotal === 3) {
        winner = board[combination[0]];
        break;
      }
    }
    
    // 5.7) Check for a tie
    if (winner === null && !board.includes(null)) {
      winner = 'T';
    }
    
    // 4.2) Render the state variables to the page
    renderBoard();
    renderMessage();
  }