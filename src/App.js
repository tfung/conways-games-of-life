import {useState, useEffect} from 'react';
import './App.css';
import Grid from './Grid';
import Control from './Control';

const DEFAULT_START_ROWS = 50;
const DEFAULT_START_COLS = 50;

const initGrid = (x = DEFAULT_START_ROWS, y = DEFAULT_START_COLS) => {
  return new Array(x).fill(null).map(r => new Array(y).fill(false));
};

const handleUpdateCell = (gameState, setGameState) => (x, y) => {
  gameState.grid[x][y] = !gameState.grid[x][y];
  setGameState({...gameState})
};

const updateGameState = (gameState, setGameState) => {
  if (!gameState.isPaused) {
    // TODO: add conways game of life logic, for now just randomly generate spots on the grid
    const x = Math.floor(Math.random()*100 % gameState.numRows);
    const y = Math.floor(Math.random()*100 % gameState.numCols);

    gameState.grid[x][y] = !gameState.grid[x][y];
    setGameState({...gameState})
  }
};

const togglePause = (gameState, setGameState) => () => {
  setGameState({
    ...gameState,
    isPaused: !gameState.isPaused
  });
};

const clearGrid = (gameState, setGameState) => () => {
  setGameState({
    ...gameState,
    grid: initGrid(gameState.numRows, gameState.numCols)
  });
}

const generateRandomGrid = (gameState, setGameState) => () => {
  const grid = initGrid(gameState.numRows, gameState.numCols);
  const numberOfPoints = Math.floor(gameState.numRows * gameState.numCols * 0.3);

  for (let i=0 ; i<numberOfPoints; i++) {
    const x = Math.floor(Math.random()*100 % gameState.numRows);
    const y = Math.floor(Math.random()*100 % gameState.numCols);

    grid[x][y] = !grid[x][y];
  }

  setGameState({
    ...gameState,
    grid
  });
}

const updateGridSize = (gameState, setGameState) => (rows, cols) => {
  setGameState({
    ...gameState,
    numRows: rows,
    numCols: cols,
    grid: initGrid(rows, cols)
  });
}

function App() {
  const [gameState, setGameState] = useState({
    grid: initGrid(),
    isPaused: true,
    numRows: DEFAULT_START_ROWS,
    numCols: DEFAULT_START_COLS
  });

  useEffect(() => {
    const timer = setInterval(() => {
      updateGameState(gameState, setGameState)
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Grid gameState={gameState} handleUpdateCell={handleUpdateCell(gameState, setGameState)} />
      <Control
        gameState={gameState}
        togglePause={togglePause(gameState, setGameState)}
        clearGrid={clearGrid(gameState, setGameState)}
        generateRandomGrid={generateRandomGrid(gameState, setGameState)}
        updateGridSize={updateGridSize(gameState, setGameState)}/>
    </div>
  );
}

export default App;
