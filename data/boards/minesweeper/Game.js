const getGame = () => {
  return board?.['new game'].map((row, rowI) => {
    return row.map((cell, cellI) => {
      const isDiscovered = board?.['discovered cells']?.[rowI]?.[cellI]

      const nearbyOffsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0],   [1, 1],
      ];

      const nearbyMines = nearbyOffsets.reduce((count, [dy, dx]) => {
        const y = rowI + dy;
        const x = cellI + dx;
        if (
          y >= 0 &&
          y < board['new game'].length &&
          x >= 0 &&
          x < board['new game'][0].length
        ) {
          const neighbor = board['new game'][y][x];
          if (neighbor.death) count++;
        }
        return count;
      }, 0);

      return {
        ...cell,
        discovered: !!isDiscovered,
        nearbyMines,
      };
    });
  });
}

return {
  game: getGame(),
  state: board?.['game state']
}