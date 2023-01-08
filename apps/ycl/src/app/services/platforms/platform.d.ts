import { Observable } from 'rxjs';

// Platformクラスの定義
interface Platform {
  okotoba$(): Observable<Okotoba>;
  notification$(): Observable<Notification<NotificationKind>>;
  post(text: string): void;
}

interface Okotoba {
  text: string;
  user: User;
  reacts: {
    user: User;
    emoji: string | null; // 通常の⭐の場合null
  }[];
  replies: {
    text: string;
    user: User;
  }[];
  spreads: {
    user: User;
  }[];
}

type NotificationKind = 'react' | 'spread' | 'follow';
type Notification<T extends NotificationKind> = {
  type: T;
} & (T extends 'react'
  ? _ReactNotification
  : T extends 'spread'
  ? _SpreadNotification
  : T extends 'follow'
  ? _FollowNotification
  : never);

interface _ReactNotification {
  okotobaId: string;
}
interface _SpreadNotification {
  state: boolean;
  okotobaId: string;
}
interface _FollowNotification {
  userId: string;
}

interface User {
  id: `@${string}@${string}`;
  avatar: {
    imageUrl: URI;
  };
}

type URI = string;
