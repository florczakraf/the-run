import * as io from "socket.io-client";

export class SocketService {
  private static _socket: SocketIOClient.Socket;
  private static _onGamesHandler: (games: RunInfo[]) => void;

  static init(_onGamesHandler: typeof SocketService._onGamesHandler) {
    SocketService._socket = io.connect("http://10.250.161.199:3000");
    SocketService._onGamesHandler = _onGamesHandler;

    SocketService._setHandlers();
    SocketService._performHandshake();
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

  private static _setHandlers(): void {
    SocketService._socket.on("games", this._onGamesHandler);
  }

  private static _performHandshake() {
    const id = 0;
    SocketService._socket.emit("handshake", { id });
  }
}
