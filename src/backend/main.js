const server = require("http").createServer();
const io = require("socket.io")(server);
const fs = require("fs");

const contents = fs.readFileSync("zabkas.json");
const targets = JSON.parse(contents);

class Game {
  constructor(
    name, // string
    startTime, // timestamp
    gameTime, // minutes
    numberOfTargets, // int
    entryFee, // decimal
    maxParticipants // int
  ) {
    this.startTime = startTime;
    this.gameTime = gameTime;
    this.name = name;
    this.entryFee = entryFee;
    this.maxParticipants = maxParticipants;
    this.players = [];
    this.targets = this.generateTargets(numberOfTargets);
    this.id = name + startTime;
  }

  hasEnded() {
    return this.startTime + this.gameTime * 60 * 1000 <= Date.now();
  }

  isFull() {
    return this.players.length >= this.maxParticipants;
  }

  generateTargets(numberOfTargets) {
    return targets.sort(() => 0.5 - Math.random()).slice(0, numberOfTargets);
  }

  register(player) {
    if (!this.isFull()) {
      this.players.push(player);
      player.visitedTargets = this.targets.map(_, i => null);
    } else {
      throw "game full";
    }
  }
}

// mock data
const inSixMinutes = Date.now() + 6 * 60 * 1000;
const theRun = new Game("The Run", inSixMinutes, 10, 6, 2.5, 500);

const games = {
  [theRun.id]: theRun
};
const players = {};

function handleHandshake(client, msg) {
  const id = msg.id;
  const player = {
    id, // unique id provided by client
    client, // socket
    locationHistory: [], // timestamp -> coords?
    currentGame: null, // game.id str
    visitedTargets: {} // timestamps for each target
  };
  players = { ...players, [id]: player };
}

io.on("connection", function(client) {
  client.on("handshake", msg => handleHandshake(client, msg));
  //   client.on("join", handleJoin);
  //   client.on("drop", handleDrop);
  //   client.on("locationHistory", handleLocationHistory);

  //   client.on("disconnect", handleDisconnect(client));

  client.on("error", function(error) {
    console.log("error from client:", client.id);
    console.log(error);
  });
});

server.listen(3000, function(error) {
  if (error) throw error;
  console.log("started on port 3000");
});
