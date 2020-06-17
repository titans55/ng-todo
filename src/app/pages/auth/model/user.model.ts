export interface BoardInfo {
  name: string;
  boardDetailRef: any;
}

export interface User {
  boards: Array<BoardInfo>;
  uid: string;
  email: string;
  displayName?: string;
}
