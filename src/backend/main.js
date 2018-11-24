const server = require("http").createServer();
const io = require("socket.io")(server);
const fs = require("fs");

const contents = fs.readFileSync("src/backend/zabkas.json");
const targets = JSON.parse(contents);

class Game {
  constructor(
    name, // string
    startTime, // timestamp
    duration, // minutes
    numberOfTargets, // int
    entryFee, // decimal
    maxParticipants // int
  ) {
    this.startTime = startTime;
    this.duration = duration;
    this.name = name;
    this.entryFee = entryFee;
    this.maxParticipants = maxParticipants;
    this.players = [];
    this.targets = this.generateTargets(numberOfTargets);
    this.id = name + startTime;
  }

  hasEnded() {
    return this.startTime + this.duration * 60 * 1000 <= Date.now();
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
      player.currentGame = this.id;
    } else {
      throw "game full";
    }
  }

  drop(player) {
    player.currentGame = null;
    visitedTargets = {};
    locationHistory = {};
    this.players = this.players.filter(p => p != player);
  }

  gameInfo() {
    return {
      id: this.id,
      name: this.name,
      startTime: this.startTime,
      duration: this.duration,
      numberOfTargets: this.targets.length,
      players: this.players.length,
      entryFee: this.entryFee
    };
  }
}

// mock data
const inSixMinutes = Date.now() + 6 * 60 * 1000;
const theRun = new Game("The Run", inSixMinutes, 10, 6, 2.5, 500);

const games = {
  [theRun.id]: theRun
};
let players = {};

function gamesInfo() {
  return Object.entries(games).map(([_, game]) => game.gameInfo());
}

function handleHandshake(client, msg) {
  const id = msg.id;
  const player = {
    id, // unique id provided by client
    client, // socket
    locationHistory: [], // timestamp -> coords?
    currentGame: null, // game.id str
    visitedTargets: {} // timestamps for each target
  };
  client.player = player;
  players = { ...players, [id]: player };
  client.emit("games", gamesInfo());
}

function handleJoin(player, msg) {
  const game = games[msg.gameId];
  game.register(player);
}

function handleDrop(player, msg) {
  const game = games[msg.gameId];
  game.drop(player);
}

function handleLocationHistory(player, msg) {
  player.locationHistory = {
    ...player.locationHistory,
    ...msg.locationHistory
  };
  // todo validate whether target was visited
}

function handleDisconnect(player) {
  try {
    handleDrop(player, { gameId: player.gameId });
  } catch (error) {}
}

io.on("connection", function(client) {
  client.on("handshake", msg => handleHandshake(client, msg));
  client.on("join", msg => handleJoin(client.player, msg));
  client.on("drop", msg => handleDrop(client.player, msg));
  client.on("locationHistory", msg =>
    handleLocationHistory(client.player, msg)
  );
  client.on("disconnect", () => handleDisconnect(client.player));
  client.on("error", function(error) {
    console.log("error from client:", client.id);
    console.log(error);
  });
});

server.listen(3000, function(error) {
  if (error) throw error;
  console.log("started on port 3000");
});
