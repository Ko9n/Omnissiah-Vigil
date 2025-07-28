import { Socket } from "socket.io";
import { log } from "../lib/logger";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  isAuthenticated?: boolean;
}

export interface AuthData {
  token?: string;
  userId?: string;
}

export class WebSocketAuth {
  private static readonly VALID_TOKENS = new Set([
    "dev-token-123", // Для разработки
    process.env.WS_AUTH_TOKEN || "default-token",
  ]);

  static authenticate(
    socket: AuthenticatedSocket,
    authData: AuthData
  ): boolean {
    try {
      // Проверяем токен
      if (!authData.token || !this.VALID_TOKENS.has(authData.token)) {
        log.warn("WebSocket authentication failed: invalid token", {
          socketId: socket.id,
          token: authData.token ? "***" : "missing",
        });
        return false;
      }

      // Проверяем userId если предоставлен
      if (authData.userId) {
        socket.userId = authData.userId;
      }

      socket.isAuthenticated = true;
      log.websocket("WebSocket authenticated successfully", {
        socketId: socket.id,
        userId: socket.userId,
      });
      return true;
    } catch (error) {
      log.error("WebSocket authentication error", error);
      return false;
    }
  }

  static isAuthenticated(socket: AuthenticatedSocket): boolean {
    return socket.isAuthenticated === true;
  }

  static requireAuth(socket: AuthenticatedSocket): boolean {
    if (!this.isAuthenticated(socket)) {
      socket.emit("error", {
        message: "Authentication required",
        code: "AUTH_REQUIRED",
      });
      return false;
    }
    return true;
  }

  static getUserId(socket: AuthenticatedSocket): string | undefined {
    return socket.userId;
  }
}

// Middleware для проверки аутентификации
export const authMiddleware = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
) => {
  const authData = socket.handshake.auth as AuthData;

  if (WebSocketAuth.authenticate(socket, authData)) {
    next();
  } else {
    next(new Error("Authentication failed"));
  }
};

// Middleware для защищенных событий
export const requireAuth = (
  socket: AuthenticatedSocket,
  event: string,
  handler: Function
) => {
  return (...args: any[]) => {
    if (!WebSocketAuth.requireAuth(socket)) {
      return;
    }
    return handler.apply(socket, args);
  };
};
