import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';

@Module({
  controllers: [],
  exports: [],
  imports: [],
  providers: [MyGateway],
})
export class GatewayModule {}
