// hooks/useSocket.ts

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Declare socket globally within the hook
let socket: Socket | undefined;

const useSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Ensure that the socket is initialized only once
    if (!socket) {
      socket = io('http://localhost:3001');
    }

    // Add event listeners for socket connection
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setConnected(false);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket?.disconnect();
      socket = undefined; // Set socket to undefined after disconnect
    };
  }, []); // Empty dependency array to run this effect only once

  return { connected };
};

export default useSocket;
