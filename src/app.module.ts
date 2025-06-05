import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FirebaseModule, BuildingsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
