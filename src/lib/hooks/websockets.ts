// useSocket.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket, SocketOptions } from "socket.io-client";

interface EmitCallback {
  (response: unknown): void;
}

interface UseSocket {
  socket: Socket | null;
  connected: boolean;
  error: Error | null;
  emit: (event: string, data?: unknown, callback?: EmitCallback) => void;
  on: (event: string, callback: (data: unknown) => void) => () => void;
}

const useSocket = (
  url: string,
  options?: Partial<SocketOptions>
): UseSocket => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url, options);

    socketRef.current.on("connect", () => {
      setConnected(true);
      setSocket(socketRef.current);
    });

    socketRef.current.on("connect_error", (err: Error) => {
      setError(err);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
      setSocket(null);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url, options]);

  const emit = useCallback(
    (event: string, data?: unknown, callback?: EmitCallback) => {
      if (socket) {
        socket.emit(event, data, callback);
      }
    },
    [socket]
  );

  const on = useCallback(
    (event: string, callback: (data: unknown) => void) => {
      if (socket) {
        socket.on(event, callback);
      }

      return () => {
        if (socket) {
          socket.off(event, callback);
        }
      };
    },
    [socket]
  );

  return { socket, connected, error, emit, on };
};

export default useSocket;
