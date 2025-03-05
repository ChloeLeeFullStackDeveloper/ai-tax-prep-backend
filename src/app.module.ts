import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { FirestoreService } from './firestore/firestore.service';
import { FirestoreController } from './firestore/firestore.controller';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [AuthModule, FirestoreModule],
  controllers: [AppController, AuthController, FirestoreController],
  providers: [AppService, AuthService, FirestoreService],
})
@Module({
  imports: [FirestoreModule],
  controllers: [FirestoreController],
  providers: [FirestoreService],
})
export class AppModule {}
