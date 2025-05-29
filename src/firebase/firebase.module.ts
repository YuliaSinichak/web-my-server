import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        if (admin.apps.length === 0) {
          // Parse JSON string from env var
          const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG!);

          // Fix private_key line breaks
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
