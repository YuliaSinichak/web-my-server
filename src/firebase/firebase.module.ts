import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        console.log('FIREBASE_CONFIG env var:', process.env.FIREBASE_CONFIG); // debug

        if (!process.env.FIREBASE_CONFIG) {
          throw new Error('FIREBASE_CONFIG env var is missing!');
        }

        if (admin.apps.length === 0) {
         const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG!);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
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
