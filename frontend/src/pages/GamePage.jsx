import React, { useState, useEffect } from "react";
import { Button, ChessBoard } from "../components/index.js";
import { useSocket } from "../hooks/useSocket.js";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function GamePage() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          const newChess = new Chess();
          setBoard(newChess.board());
          setStarted(true);
          console.log("Game Initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard([chess.board()]); 
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game Over");
          break;
        default:
          console.log("Unknown message type");
      }
    };
  }, [socket]);

  if (!socket) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg w-full">
          <div className="grid grid-cols-6 gap-4 w-full">
            <div className="col-span-4 w-full flex justify-center">
              <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
            </div>
            <div className="col-span-2 w-full">
              {!started && <Button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                }}
                className="hover:bg-green-700 py-2 px-4"
              >
                Play
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
