import { DocumentReference } from '@angular/fire/firestore/interfaces';

export interface BoardInfo {
  boardDetailRef: DocumentReference;
}

export interface UserModel {
  boards: Array<BoardInfo>;
  uid: string;
  email: string;
  displayName?: string;
}
