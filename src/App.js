import {useState, useEffect} from 'react';
import './App.css';
import Grid from './Grid';
import Control from './Control';
import {initGrid, updateGrid, getRandomCoordinate} from './helper';
import {DEFAULT_START_ROWS, DEFAULT_START_COLS} from './constants';

const handleUpdateCell = (gameState, setGameState) => (x, y) => {
  gameState.grid[x][y] = !gameState.grid[x][y];
  setGameState({...gameState})
};

const updateGameState = (gameState, setGameState) => {
  if (!gameState.isPaused) {
    setGameState({
      ...gameState,
      grid: updateGrid(gameState.grid, gameState.numRows, gameState.numCols)
    })
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
    const {x, y} = getRandomCoordinate(gameState.numRows, gameState.numCols);

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
