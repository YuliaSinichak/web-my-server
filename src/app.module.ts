import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [FirebaseModule, BuildingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
