import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/index.js'

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="pt-10 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              className="max-w-96"
              src="../../chessboard.jpeg"
              alt="chess-board"
            />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold">
                Play Chess online on the #2 Site!
              </h1>
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => navigate("/game")}
                className="hover:bg-green-700 py-2 px-4"
              >
                Play Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage
