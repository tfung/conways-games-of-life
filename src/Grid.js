const Grid = (props) => {
    const {gameState: {grid}, handleUpdateCell} = props;

    return (
        <div className="grid">
            {
                grid.map((r, rIndex) => (
                    <div key={rIndex} className="grid-row">
                        {r.map((c, cIndex) => {
                            const isFilled = c;

                            return (
                                <span key={cIndex} onClick={() => handleUpdateCell(rIndex, cIndex)} className={`grid-col ${isFilled ? 'grid-col-filled' : ''}`} />
                            )
                        })}
                    </div>
                ))
            }
        </div>
    );
}

export default Grid;