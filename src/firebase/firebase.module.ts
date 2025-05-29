import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        if (!process.env.FIREBASE_CONFIG) {
          throw new Error('FIREBASE_CONFIG env variable is not set');
        }
        const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      
        if (admin.apps.length === 0) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }
        return admin.firestore();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
