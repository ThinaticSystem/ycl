import { Observable } from 'rxjs';

// Platformクラスの定義
interface PlatForm {
  okotoba$(): Observable<Okotoba>;
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

interface User {
  id: `@${string}@${string}`;
  avatar: {
    imageUrl: URI;
  };
}

type URI = string;
