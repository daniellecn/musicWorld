import * as io from 'socket.io-client';
export const serverAddress = 'http://localhost:4200';
export const socket = io.connect(serverAddress);