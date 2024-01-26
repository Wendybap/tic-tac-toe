import { useState} from "react";
import {Square} from './/components/Square'
import { TURNS} from "./constants";
import { allCombinations, checkWinnerFrom, checkEndGame} from './gameLogic/gameLogic'
import {WinnerModal} from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './gameLogic/storage/index' 
import confetti from "canvas-confetti";
import "./App.css";


function App() {


  // Inicializar el estado del tablero[board] dependiendo si tengo algún valor almacenado el localStorage 
  const [board, setBoard] = useState(() => {
    const storedBoard = window.localStorage.getItem('board');
    try {
      return storedBoard ? JSON.parse(storedBoard) : Array(9).fill(null);
    } catch (error) {
      console.error('Error parsing storedBoard:', storedBoard, error);
      return Array(9).fill(null);
    }
  });
    

    // Saber a quien le toca el turno dependiendo si hay datos almacenados en locaStorage
    const [turn, setTurn] = useState(() => {
      const storedTurn = window.localStorage.getItem('turn');
      return storedTurn || TURNS.x;
    });

  
  // Estado para saber el ganador
   const [winner, setWinner] = useState(null)

  
    
  const upDateBoard = (index) => {
    // No sobrescribir en el tablero, si ya tiene algo
  if(board[index] || winner) return

  // Actualizar tablero
   const newBoard = [...board]
   newBoard[index] = turn
   setBoard(newBoard)

  // Cambiar turno
   const newTurn = turn === TURNS.x ? TURNS.o :TURNS.x
   setTurn(newTurn)   

  //  Guardar partida aquí en localStorage
  saveGameToStorage({
    
    board: newBoard,
    turn: newTurn,
    
  })

  //  revisar si hay ganador o empate
  const newWinner = checkWinnerFrom(newBoard, allCombinations)
  if(newWinner){
    confetti()
    setWinner(newWinner)
  }else if(checkEndGame(newBoard, allCombinations)){
setWinner(false)
  }

  }

  const resetGame = () =>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.x) 
  setWinner(null)

  resetGameStorage()
  }

    

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className="game">
          {board.map((square, index) => { 
            return(
            <Square key={index} index={index} updateBoard={upDateBoard} >{square}
            </Square>
          )}
          )}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>
       <WinnerModal winner={winner} resetGame={resetGame}/> 
      </main>
    </>
  );
}

export default App;