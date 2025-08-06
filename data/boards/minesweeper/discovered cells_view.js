//@card/react

function MatrixTable({ data }) {
  const rows = Array.isArray(data) ? data : []
  const maxCols = rows.reduce((m, r) => Math.max(m, Array.isArray(r) ? r.length : 0), 0)

  const wrapStyle = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  }
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    height: '100%',
  }
  const cellStyle = {
    color: "#333",
    width: "24px",
    height: "24px",
  }
  console.log("dev: rows.find(row => row.find(cell => cell == true) !== undefined)", (rows.find(row => row.find(cell => cell == true) !== undefined))) == undefined

  return (<div style={wrapStyle} >
    <table style={tableStyle}>
      <tbody>
        {(rows.find(row => row.find(cell => cell == true) !== undefined)) == undefined
          ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <Text colSpan={maxCols} >Press a cell to start 👇</Text>
          </View>
          : rows.map((row, rIdx) => (
            <tr key={rIdx} >
              {
                Array.from({ length: maxCols }).map((_, cIdx) => {
                  const v = Array.isArray(row) ? row[cIdx] : undefined
                  let emoji = v ? "." : "";
                  return <td key={cIdx} style={{ ...cellStyle, backgroundColor: v ? "#f0f0f050" : undefined }} ></td >
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  )
}

function Widget(card) {
  const value = card.value;
  const isMatrix = Array.isArray(value) && value.every(r => Array.isArray(r));
  const fullHeight = value !== undefined && typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean";

  const content = (
    <YStack f={1} h="100%" mt={fullHeight ? "20px" : "0px"} ai="stretch" jc="flex-start" width="100%" >
      {
        card.displayResponse !== false && (
          isMatrix ? (
            <MatrixTable data={value} />
          ) : (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ fontSize: '30px' }}>🥱</Text>
            </View>
          )
        )}
    </YStack>
  );

  return (
    <Tinted>
      <ProtoThemeProvider forcedTheme={window.TamaguiTheme} >
        <ActionCard data={card} style={{ height: '100%', border: "10px solid white" }}>
          {content}
        </ActionCard>
      </ProtoThemeProvider>
    </Tinted>
  );
}
