// The code creates an 8x8 grid where each cell has a unique identifier, a default 'discovered' property set to false, and a 'death' property that is true for exactly 10 random cells.
function createGrid() {
    const gridSize = params.gridSize // 8;
    const mineCount = params.mineCount // 10;

    // Helper function to generate unique cell IDs

    // Generate grid with all 'death' properties set to false initially
    const grid = Array.from({ length: gridSize }, (_, row) => {
        return Array.from({ length: gridSize }, (_, col) => {
            return {
                discovered: false,
                death: false,
            };
        });
    });

    // Set 'death' to true for 10 random cells
    let deathCellsSet = 0;
    while (deathCellsSet < mineCount) {
        const randomRow = Math.floor(Math.random() * gridSize);
        const randomCol = Math.floor(Math.random() * gridSize);

        if (!grid[randomRow][randomCol].death) {
            grid[randomRow][randomCol].death = true;
            deathCellsSet++;
        }
    }

    return grid;
}

const newGame = createGrid();

await execute_action("discovered cells", {
    action: "reset",
    gridSize: params.gridSize
})

await execute_action("game state", {
    board: newGame,
    discoveredCells: [],
})

return newGame