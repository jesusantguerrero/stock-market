import io from 'socket.io-client';


export default class Socket {
  constructor(url) {
    this.socket = io( url || 'http://localhost:5000/');
  }

  stockChange(data) {
    this.socket.emit('stock change', data);
  }

  onStockChange(callback) {
    this.socket.on('stock changed', callback)
  }
}
