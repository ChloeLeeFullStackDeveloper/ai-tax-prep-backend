import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccount = JSON.parse(
      fs.readFileSync('firebase-service-account.json', 'utf-8'),
    );

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    this.db = admin.firestore();
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async saveUser(uid: string, email: string): Promise<void> {
    await this.db.collection('users').doc(uid).set({ email, createdAt: new Date() });
  }
}
