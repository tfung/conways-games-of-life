import {useState} from 'react';

const Control = (props) => {
    const {
        gameState: {isPaused, numRows = 0, numCols = 0},
        togglePause,
        clearGrid,
        generateRandomGrid,
        updateGridSize
    } = props;

    const [gridSize, setGridSize] = useState({
        numRows,
        numCols
    });

    return (
        <div className="control">
            <button onClick={() => togglePause()}>{isPaused ? 'Unpause Game' : 'Pause Game'}</button>
            <button onClick={() => clearGrid()}>Clear Grid</button>
            <button onClick={() => generateRandomGrid()}>Generate Random Grid</button>
            <div className="rol-col-update-section">
                <div>
                    <label>
                        Number of rows:
                        <input
                            type="text"
                            value={gridSize.numRows}
                            onChange={({target: {value}}) => setGridSize({numRows: parseInt(value), numCols: gridSize.numCols})} />
                    </label>
                    <label>
                        Number of columns:
                        <input
                            type="text"
                            value={gridSize.numCols}
                            onChange={({target: {value}}) => setGridSize({numRows: gridSize.numRows, numCols: parseInt(value)})}  />
                    </label>
                </div>
                <button onClick={() => updateGridSize(gridSize.numRows, gridSize.numCols)}>Update Grid</button>
            </div>
        </div>
    );
};

export default Control;