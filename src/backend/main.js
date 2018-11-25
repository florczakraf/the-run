const server = require("http").createServer();
const io = require("socket.io")(server);
const fs = require("fs");

const contents = fs.readFileSync("src/backend/zabkas.json");
const targets = JSON.parse(contents);

class Game {
  constructor(
    name, // string
    description, // string
    startTime, // timestamp
    duration, // minutes
    numberOfTargets, // int
    entryFee, // decimal
    maxParticipants // int
  ) {
    this.startTime = startTime;
    this.duration = duration;
    this.name = name;
    this.description = description;
    this.entryFee = entryFee;
    this.maxParticipants = maxParticipants;
    this.players = [];
    this.targets = this.generateTargets(numberOfTargets);
    this.id = name + startTime;
    this.active = false;
    this.winners = [];
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
      console.log(this.targets);
      player.visitedTargets = this.targets.map(() => null);
      player.currentGame = this.id;
    } else {
      throw "game full";
    }
  }

  drop(player) {
    player.currentGame = null;
    player.visitedTargets = [];
    player.locationHistory = {};
    this.players = this.players.filter(p => p != player);
  }

  gameInfo() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      startTime: this.startTime,
      duration: this.duration,
      numberOfTargets: this.targets.length,
      players: this.players.length,
      finished: this.players.filter(p => p.finished()).length,
      entryFee: this.entryFee
    };
  }

  start() {
    if (!this.active) {
      this.players.map(p => {
        p.client.emit("gameStarted", {
          ...this.gameInfo(),
          targets: this.targets
        });
      });
      this.active = true;
    }
  }

  summarize() {
    this.active = false;
    this.players.map(p => {
      p.client.emit("summary", {
        winners: this.winners, // array of ids of players who finished the game in the ascending order
        visitedTargets: p.visitedTargets, // times per target, null if not visited,
        targets: this.targets // array of coords for targets
      });
    });
  }
}

// mock data
const inOneMinute = Date.now() + 60 * 1000;
const theRun = new Game(
  "The Run",
  "Can you prove that you are the champion of the urban jungle? No holds barred.",
  inOneMinute,
  10 * 60 * 60 * 1000,
  6,
  2.5,
  500
);

const in23Minutes = Date.now() + 23 * 60 * 1000;
const topTen = new Game(
  "Top Ten",
  "No risk no fun! Compete with nine other people for higher stake.",
  in23Minutes,
  10 * 60 * 60 * 1000,
  5,
  20,
  10
);

const games = {
  [theRun.id]: theRun,
  [topTen.id]: topTen
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
    visitedTargets: [], // timestamps for each target
    finished: () => {
      this.currentGame &&
        this.visitedTargets &&
        Array.every(this.visitedTargets);
    }
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

function handleVisitTarget(player, msg) {
  player.visitedTargets[msg] = date.now();
  if (Array.every(player.visitedTargets)) {
    games[player.gameId].winners.push(player.id);
  }
}

io.on("connection", function(client) {
  client.on("handshake", msg => handleHandshake(client, msg));
  client.on("join", msg => handleJoin(client.player, msg));
  client.on("drop", msg => handleDrop(client.player, msg));
  client.on("visitTarget", msg => handleVisitTarget(client.player, msg));
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

function tick() {
  Object.entries(games).map(([_, game]) => {
    if (!game.active) {
      if (game.startTime >= Date.now()) {
        game.start();
      } else {
        return; // game is dead now, could it be removed?
      }
    }
    game.players
      .filter(p => !p.finished())
      .map(p =>
        p.client.emit("stats", {
          ...game.gameInfo(),
          visitedTargets: p.visitedTargets
        })
      );

    if (game.hasEnded()) {
      game.summarize();
    }
  });
}

setInterval(tick, 500);
