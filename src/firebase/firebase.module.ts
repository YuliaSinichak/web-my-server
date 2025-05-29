import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';



@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        // Initialize app only once
        if (admin.apps.length === 0) {
          admin.initializeApp({
            credential: admin.credential.cert(
              require('../../newwebtech-1d5e4-firebase-adminsdk-fbsvc-d30e19118f.json'),
            ),
          });
        }
        return admin.firestore();
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
