import * as React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {LandingPage, GamePage} from './pages/index.js'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route path="" element={<LandingPage />} />
        <Route path="game" element={<GamePage />} />
      </Route>
    )
  );
  
  return (
    <div className="h-screen">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
