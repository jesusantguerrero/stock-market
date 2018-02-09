import io from 'socket.io-client';


export default class Socket {
  constructor() {
    const origin = window.location.origin;
    const url =  (origin.includes('localhost')) ? 'http://localhost:5000/' : origin
    this.socket = io(url);
  }

  stockChange(method, data) {
    this.socket.emit('stock change',method, data);
  }

  onStockChange(callback) {
    this.socket.on('stock changed', callback)
  }
}
