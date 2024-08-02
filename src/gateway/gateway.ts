import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

import { Server } from 'socket.io';

/// on module init -- Interface defining method called once the host module has been initialized.
// 360 190
@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {                 
      console.log(`Socket with id = ${socket.id} is connected`);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    console.log(body);
    let i = 4;
    this.server.emit('onMessage', {
      msg: 'New msg',
      content: `echoing ${JSON.stringify(body)}`,
    });
  }
}
