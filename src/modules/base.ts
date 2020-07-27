import { Module } from '@nestjs/common';
import { AppController } from '@controllers/base';
import { AppService } from '@services/base';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@localhost:27017')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
