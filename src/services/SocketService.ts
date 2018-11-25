import * as io from "socket.io-client";

export class SocketService {
  private static _socket: SocketIOClient.Socket;
  private static _onGamesHandler: (games: RunInfo[]) => void;
  private static _onGameStartedHandler: (game: RunInfo) => void;

  static init(
    _onGamesHandler: typeof SocketService._onGamesHandler,
    _onGameStartedHandler: typeof SocketService._onGameStartedHandler
  ) {
    SocketService._socket = io.connect("http://10.250.161.199:3000");
    SocketService._onGamesHandler = _onGamesHandler;
    SocketService._onGameStartedHandler = _onGameStartedHandler;

    SocketService._setHandlers();
    SocketService._performHandshake();
  }

  static setStatsHandler(_onStatsHandler: (stats: Stats) => void) {
    SocketService._socket.on("state", _onStatsHandler);
  }

  static joinGame(gameId: string) {
    SocketService._socket.emit("join", { gameId });
  }

  static dropGame(gameId: string) {
    SocketService._socket.emit("drop", { gameId });
  }

  static sendLocation(location: any) {
    SocketService._socket.emit("locationHistory", location);
  }

  static startGameXD(gameId: string) {
    SocketService._socket.emit("startGame", { gameId });
  }

  private static _setHandlers(): void {
    SocketService._socket.on("games", this._onGamesHandler);
    SocketService._socket.on("gameStarted", this._onGameStartedHandler);
  }

  private static _performHandshake() {
    const id = 0;
    SocketService._socket.emit("handshake", { id });
  }
}
