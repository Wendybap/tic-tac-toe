// Función para generar todas las combinaciones posibles del tablero dinámicamente
const generateAllCombinations = (boardSize) => {
  const combinations = [];

  // Combinaciones por filas
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // Para cada celda en la fila, se agrega una combinación de elementos consecutivos en esa fila.
      combinations.push(Array.from({ length: boardSize }, (_, index) => index + row * boardSize));
    }
  }

  // Combinaciones por columnas
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row < boardSize; row++) {
      // Para cada celda en la columna, se agrega una combinación de elementos consecutivos en esa columna.
      combinations.push(Array.from({ length: boardSize }, (_, index) => index * boardSize + row));
    }
  }

  // Combinación diagonal de izquierda a derecha
  combinations.push(Array.from({ length: boardSize }, (_, index) => index * (boardSize + 1)));

  // Combinación diagonal de derecha a izquierda
  combinations.push(Array.from({ length: boardSize }, (_, index) => (index + 1) * (boardSize - 1)));

  return combinations;
};


 // Llamado a la función que genera las combinaciones dinámicas
 export const allCombinations = generateAllCombinations(3)

// Detectar el ganador revisando las combinaciones ganadoras
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of allCombinations){
    const [a, b, c] = combo
    if (boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
      
      ){
        return boardToCheck[a]
      }
    }
  // Si no hay ganador no retorna nada
    return null
    }

    // Detectar si hay empate y fin del juego
 export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
    }