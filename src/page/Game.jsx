import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL); 

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on("aiMove", (index) => {
      const newBoard = [...board];
      newBoard[index] = "O";
      setBoard(newBoard);
      setXIsNext(true);
      const w = calculateWinner(newBoard);
      if (w) setWinner(w);
    });

    return () => {
      socket.off("aiMove");
    };
  }, [board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !xIsNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setXIsNext(false);

    const w = calculateWinner(newBoard);
    if (w) setWinner(w);

    socket.emit("playerMove", { board: newBoard });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-500">
      <h1 className="text-4xl font-bold text-white mb-6">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-white border-4 border-indigo-500 text-4xl font-bold text-indigo-600 hover:bg-indigo-100 transition"
          >
            {board[index]}
          </button>
        ))}
      </div>
      <div className="mt-6 text-2xl text-white font-semibold">
        {winner ? `Winner: ${winner} `: `Next Player: ${xIsNext ? "X" : "O"}`}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 bg-white text-indigo-700 font-semibold px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-100 transition-transform transform hover:scale-105"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;