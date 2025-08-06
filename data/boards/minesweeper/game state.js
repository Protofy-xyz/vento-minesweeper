function checkGameState() {
  const game = board?.['new game'];
  const discoveredCells = board?.["discovered cells"];

  if (!Array.isArray(game) || game.length === 0) {
    return "waitting";
  }

  // Verifica si no hay ninguna celda descubierta
  const isIdle = discoveredCells?.flat().every(v => v === false);
  if (isIdle) return "waitting";

  let hasExploded = false;
  let totalSafeCells = 0;
  let totalDiscoveredSafeCells = 0;

  for (let rowI = 0; rowI < game.length; rowI++) {
    for (let colI = 0; colI < game[rowI].length; colI++) {
      const cell = game[rowI][colI];
      const isDiscovered = discoveredCells?.[rowI]?.[colI] === true;

      if (cell.death) {
        if (isDiscovered) {
          hasExploded = true;
        }
      } else {
        totalSafeCells++;
        if (isDiscovered) {
          totalDiscoveredSafeCells++;
        }
      }
    }
  }

  if (hasExploded) return 'death';
  if (totalSafeCells > 0 && totalDiscoveredSafeCells === totalSafeCells) {
    return 'victory';
  }
  return 'playing';
}

return checkGameState();
