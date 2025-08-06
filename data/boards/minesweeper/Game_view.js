reactCard(`
  function Widget(props) {
    const game= ( props?.value?.game ?? data?.value?.game ) ?? []
    const gameState = (props?.value?.state ?? data?.value?.state) ?? ""

    const getCellContent = (cell) => {
        if (!cell.discovered) return "";
        if (cell.death) return "☠️";
        if (cell.nearbyMines > 0) return cell.nearbyMines;
        return ""; // vacío sin minas alrededor
    };

    const getCellColor = (cell) => {
      if (!cell.discovered) return "#EFF0D1";
      if (cell.death) return "#660000";
      return "transparent";
    };

    const getTextStyle = (cell) => {
      const colors = {
        1: "#1E90FF", // azul
        2: "#228B22", // verde
        3: "#FF8C00", // naranja
        4: "#B22222", // rojo fuerte
        5: "#8B008B", // púrpura
        6: "#20B2AA", // turquesa
        7: "#000000", // negro
        8: "#808080", // gris
      };

    return {
      color: colors[cell.nearbyMines] ?? "#444",
      fontWeight: "bold",
      fontSize: 30,
    };
  };
    
return (
  <Tinted>
    <View
      style={{
        gap: 10, 
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: 10,
      }}
      className="no-drag"
    >
{ game.length 
      ? game.map((row, rowI) => (
        <View
          key={rowI}
          style={{
            gap: 10,
            width:"100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {row.map((cell, cellI) => (
            <Button
              onPress={async () =>{ 
                if (gameState === "playing" || gameState === "waitting") {
                    await execute_action("discover cell", {
                         row: rowI,
                         column: cellI,
                    })
                }
                 
              }}
              key={rowI + "-" + cellI}
              cursor={gameState === "playing" || gameState === "waitting" ? "pointer" : "default"}
              hoverStyle={{ backgroundColor: !(gameState === "playing" || gameState === "waitting") ? getCellColor(cell) : undefined }}
              style={{ flex: 1 , height: "100%", 
              backgroundColor: getCellColor(cell),
              }}     
            >
              <Text style={getTextStyle(cell)}>
                {getCellContent(cell)}
              </Text>
            </Button>
          ))}
        </View> 
      ))
      : <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Press 🔄 to start a new game</Text>
        </View>
} 
    </View>
  </Tinted>
);
  }
`, data.domId)
