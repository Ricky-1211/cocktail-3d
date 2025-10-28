
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
 // Import authService to get token

// Define socket URL from environment variable
const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

// Interface for SocketContext
interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  connectSocket: () => void;
  error: string | null;
}

// Create SocketContext with undefined as initial value
const SocketContext = createContext<SocketContextProps | undefined>(undefined);

// SocketProvider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectSocket = () => {
    if (socketRef.current?.connected) {
      return; // Prevent creating multiple socket instances
    }

    // Get JWT token from authService
   

    // Initialize socket with authentication
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      upgrade: false,
      // Pass token for backend socketAuth middleware
      reconnection: true, // Enable auto-reconnection
      reconnectionAttempts: 5, // Limit reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts
    });

    // Handle connection
    newSocket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('Socket.IO connected');
    });

    // Handle connection errors
    newSocket.on('connect_error', (err) => {
      setIsConnected(false);
      setError(err.message || 'Failed to connect to server');
      console.error('Socket connection error:', err);
    });

    // Handle custom errors from server (e.g., from socketAuth middleware)
    newSocket.on('error', (error: { message: string }) => {
      setIsConnected(false);
      setError(error.message || 'Server error');
      console.error('Socket server error:', error.message);
    });

    // Handle disconnection
    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('Socket.IO disconnected:', reason);
      if (reason === 'io server disconnect') {
        setError('Disconnected by server');
      }
    });

    socketRef.current = newSocket;
  };

  // Initialize socket on mount
  useEffect(() => {
    connectSocket();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('connect');
        socketRef.current.off('connect_error');
        socketRef.current.off('error');
        socketRef.current.off('disconnect');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Context value
  const value: SocketContextProps = {
    socket: socketRef.current,
    isConnected,
    connectSocket,
    error,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

// Custom hook to use socket
export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
