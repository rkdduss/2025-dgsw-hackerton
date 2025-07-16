import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  off,
  get,
  DataSnapshot,
  DatabaseReference,
  Database,
} from 'firebase/database';
import {
  getAuth,
  signInWithCustomToken,
  signOut,
  Auth,
} from 'firebase/auth';

const PERMISSION_DENIED_STATUS_CODE = 'PERMISSION_DENIED';

export interface RealTimeFetchParams {
  path: string;
}

export interface RealTimeSubscribeParams<T> {
  path: string;
  event?: 'value'; // for now we only support 'value'
  callback: (value: T) => void;
}

export interface RealTimeUnsubscribeParams {
  path: string;
  event?: 'value';
}

export class RealTimeApi {
  private app: FirebaseApp;
  private db: Database;
  private auth: Auth;

  constructor() {
    this.app = initializeApp({
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY!,
      databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL!,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID!,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
    });

    this.db = getDatabase(this.app);
    this.auth = getAuth(this.app);
  }

  private handleAuthenticationErrors(error: any) {
    if (error?.code === PERMISSION_DENIED_STATUS_CODE) {
      // handle forced logout here
      console.warn('Permission denied');
    }
  }

  public connect(token: string) {
    console.log(token)
    return signInWithCustomToken(this.auth, token);
  }

  public disconnect() {
    return signOut(this.auth);
  }

  public async fetch<T>({ path }: RealTimeFetchParams): Promise<T> {
    try {
      const snapshot: DataSnapshot = await get(ref(this.db, path));
      return snapshot.val() as T;
    } catch (error) {
      this.handleAuthenticationErrors(error);
      throw error;
    }
  }

  public async set(path: string, value: any) {
    return await import('firebase/database').then(({ ref, set }) => set(ref(this.db, path), value));
  }

  public async push(path: string, value: any) {
    return await import('firebase/database').then(({ ref, push }) => push(ref(this.db, path), value));
  }

  public async update(path: string, value: any) {
    return await import('firebase/database').then(({ ref, update }) => update(ref(this.db, path), value));
  }

  public async remove(path: string) {
    return await import('firebase/database').then(({ ref, remove }) => remove(ref(this.db, path)));
  }

  public subscribe<T>({ path, callback, event = 'value' }: RealTimeSubscribeParams<T>) {
    const reference: DatabaseReference = ref(this.db, path);
    const handler = (snapshot: DataSnapshot) => {
      callback(snapshot.val() as T);
    };

    onValue(reference, handler, this.handleAuthenticationErrors);
    return () => off(reference, event, handler);
  }

  public unsubscribe({ path, event = 'value' }: RealTimeUnsubscribeParams) {
    const reference: DatabaseReference = ref(this.db, path);
    off(reference, event);
  }
}

export default new RealTimeApi();