import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';


export type Building = {
  id?: string;
  userId: string;
  position: { row: number; col: number };
  type: string;
  isUpgraded: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  upgradedIcon?: string | null;
};

export type BuildingWithId = Building & { id: string };

@Injectable()
export class BuildingsService {
    private buildingsCollection;

    constructor(@Inject('FIRESTORE') private firestore: Firestore) {
      this.buildingsCollection = this.firestore.collection('buildings');
    }

  async saveBuilding(
    userId: string,
    row: number,
    col: number,
    type: string,
    isUpgraded: boolean,
    upgradedIcon: string | null = null,
  ): Promise<void> {
    const now = admin.firestore.Timestamp.now();

    const buildingData: Building = {
      userId,
      position: { row, col },
      type,
      isUpgraded,
      createdAt: now as any, // make sure types align
      upgradedIcon,
    };

    const querySnapshot = await this.buildingsCollection
      .where('userId', '==', userId)
      .where('position.row', '==', row)
      .where('position.col', '==', col)
      .get();

    if (!querySnapshot.empty) {
      const buildingDoc = querySnapshot.docs[0];
      await this.buildingsCollection.doc(buildingDoc.id).update(buildingData);
    } else {
      await this.buildingsCollection.add(buildingData);
    }
  }

  async getBuildings(): Promise<BuildingWithId[]> {
    const snapshot = await this.buildingsCollection.get();
    const buildings: BuildingWithId[] = [];
    snapshot.forEach(doc => {
      buildings.push({ id: doc.id, ...(doc.data() as Building) });
    });
    return buildings;
  }
}
