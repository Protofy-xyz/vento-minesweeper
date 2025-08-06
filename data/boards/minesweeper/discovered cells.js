// The code handles the manipulation of a grid for the minesweeper board based on user params.
// If the 'action' parameter is "reset" or "clear," it returns a new 8x8 grid filled with false.
// If 'row' and 'column' parameters are provided, it updates the respective cell to true.
// If no previous grid exists, a new empty grid is created.


let grid = Array.from({ length: params.gridSize }, () => Array(params.gridSize).fill(false))

if (params.action === 'reset' || params.action === 'clear') {
    return grid;
} else {
    grid = JSON.parse(JSON.stringify(board?.[name] ?? grid));
    const { row, column } = params;
    if (row === undefined || column === undefined) return grid;
    grid[row][column] = true;
    return grid;
}