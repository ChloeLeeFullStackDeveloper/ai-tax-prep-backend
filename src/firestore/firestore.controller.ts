import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Controller('firestore')
export class FirestoreController {
  constructor(private readonly firestoreService: FirestoreService) {}

  @Post('saveUser')
  async saveUser(@Body() body: { uid: string; email: string }) {
    await this.firestoreService.saveUserData(body.uid, body.email);
    return { message: 'User data saved successfully' };
  }

  @Get('getUser/:uid')
  async getUser(@Param('uid') uid: string) {
    const userData = await this.firestoreService.getUserData(uid);
    return userData || { message: 'User not found' };
  }
}
