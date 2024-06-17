// web-sockets in nodejs

// At start while running the server it wont started since the common nodejs syntax uses require not import so I went and changed the types to modules

import { WebSocketServer } from "ws";
import { GameManager } from "./src/GameManager.js";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);

  ws.on("disconnect",()=> gameManager.removeUser(ws))
});