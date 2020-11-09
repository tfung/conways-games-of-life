import {DEFAULT_START_ROWS, DEFAULT_START_COLS} from './constants';

export const initGrid = (x = DEFAULT_START_ROWS, y = DEFAULT_START_COLS) => {
    return new Array(x).fill(null).map(r => new Array(y).fill(false));
};

export const getRandomCoordinate = (numRows, numCols) => {
    const x = Math.floor(Math.random()*100 % numRows);
    const y = Math.floor(Math.random()*100 % numCols);

    return {x, y};
}

/* 
Update grid rules:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
export const updateGrid = (grid, numRows, numCols) => {
    const updatedGrid = initGrid(numRows, numCols);

    for (let i=0; i<numRows; i++) {
        for (let j=0; j<numCols; j++) {
            const isCellAlive = grid[i][j];
            let neighbourCount = 0;

            for (let k=i-1; k<=i+1; k++) {
                for (let l=j-1; l<=j+1; l++) {
                    if (k >= 0 && k < numRows
                            && l >= 0 && l < numCols
                            && !(k === i && l === j)
                            && grid[k][l]) {

                        neighbourCount++;
                    }
                }
            }

            if (isCellAlive && (neighbourCount >= 2 && neighbourCount <= 3)) {
                updatedGrid[i][j] = true;
            } else if (!isCellAlive && neighbourCount === 3) {
                updatedGrid[i][j] = true;
            }
        }
    }

    return updatedGrid;
};