function tableShowHelp(moves, determineWinner) {
  const headerline = [" PC / User >", ...moves];
  const table = [headerline];

  for (const move of moves) {
    const row = [move];
    for (const opponentMove of moves) {
      const result = determineWinner(move, opponentMove);
      row.push(result);
    }
    table.push(row);
  }

  const maxLengths = headerline.map((_, colIndex) =>
    Math.max(...table.map((row) => row[colIndex].length))
  );

  const delimiter = maxLengths.map((length) => "-".repeat(length + 2));

  const formatRow = (row) =>
    "| " +
    row
      .map((cell, colIndex) => cell.padEnd(maxLengths[colIndex]))
      .join(" | ") +
    " |";

  console.log(`+${delimiter.join("+")}+`);
  table.forEach((row, rowIndex) => {
    console.log(formatRow(row));
    if (rowIndex === 0) {
      console.log(`+${delimiter.join("+")}+`);
    }
  });
  console.log(`+${delimiter.join("+")}+\n`);
}

module.exports = tableShowHelp;
