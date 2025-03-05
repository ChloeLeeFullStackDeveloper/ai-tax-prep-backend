import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirestoreService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccount = JSON.parse(
      fs.readFileSync('firebase-service-account.json', 'utf8'),
    );

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    this.db = admin.firestore();
  }

  async saveUserData(uid: string, email: string): Promise<void> {
    try {
      await this.db.collection('users').doc(uid).set({
        email: email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`User ${uid} save to Firestore`);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
    }
  }

  async getUserData(uid: string): Promise<any> {
    const doc = await this.db.collection('users').doc(uid).get();
    return doc.exists ? doc.data() : null;
  }
}
