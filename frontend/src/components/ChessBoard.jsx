import {React, useState} from "react";

function ChessBoard({ chess, setBoard, board, socket }) {

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const MOVE = "move";

  return (
    <>
      <div className="w-full">
        {board.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex">
              {row.map((square, colIndex) => {
                const sqaureRepresentation = String.fromCharCode(97 + (colIndex % 8)) +"" + (8 - rowIndex);
                return (
                  <div
                    onClick={() => {
                      if (!from) {
                        setFrom(sqaureRepresentation);
                      } else {
                        setTo(sqaureRepresentation);
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: {
                              move: {
                                from,
                                to: sqaureRepresentation,
                              },
                            },
                          })
                        );
                        setFrom(null);
                        chess.move({
                          from,
                          to: sqaureRepresentation,
                        });
                        setBoard(chess.board());
                      }
                    }}
                    key={colIndex}
                    className={`w-16 h-16 ${
                      (rowIndex + colIndex) % 2 == 0
                        ? "bg-green-500"
                        : "bg-green-300"
                    }`}
                  >
                    <div className="w-full flex justify-center h-full">
                      <div className="h-full justify-center flex flex-col ">
                        {square ? (
                          <img
                            className="w-4"
                            src={`/${
                              square?.color === "b"
                                ? square?.type
                                : `${square?.type?.toUpperCase()} copy`
                            }.png`}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChessBoard;
