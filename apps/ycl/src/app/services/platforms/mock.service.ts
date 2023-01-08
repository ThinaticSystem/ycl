import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { interval, map, Observable } from 'rxjs';
import { Notification, NotificationKind, Platform } from './platform.d';

// リトライ・死活監視はこの層で行う

@Injectable({
  providedIn: 'root',
})
export class MockService implements Platform {
  constructor() {
    faker.setLocale('ja');
  }

  okotoba$() {
    const genUserDetail = () => ({
      id: `@${faker.name.firstName()}@${faker.internet.domainName()}` as const,
      avatar: {
        imageUrl: faker.image.avatar(),
      },
    });

    return interval(3000).pipe(
      map(() => ({
        text: faker.lorem.sentence(),
        user: genUserDetail(),
        reacts: [
          {
            user: genUserDetail(),
            emoji: null,
          },
          {
            user: genUserDetail(),
            emoji: faker.internet.emoji(),
          },
        ].filter(() => Math.random() < 0.2),
        replies: [
          {
            text: faker.lorem.sentence(),
            user: genUserDetail(),
          },
          {
            text: faker.lorem.sentence(),
            user: genUserDetail(),
          },
          {
            text: faker.lorem.sentence(),
            user: genUserDetail(),
          },
        ].filter(() => Math.random() < 0.2),
        spreads: [
          {
            user: genUserDetail(),
          },
          {
            user: genUserDetail(),
          },
          {
            user: genUserDetail(),
          },
        ].filter(() => Math.random() < 0.2),
      }))
    );
  }

  notification$(): Observable<Notification<NotificationKind>> {
    const genReactNotification = (): Notification<'react'> => ({
      type: 'react',
      okotobaId: faker.datatype.uuid(),
    });
    const genSpreadNotification = (): Notification<'spread'> => ({
      type: 'spread',
      state: faker.datatype.boolean(),
      okotobaId: faker.datatype.uuid(),
    });
    const genFollowNotification = (): Notification<'follow'> => ({
      type: 'follow',
      userId: '',
    });

    return interval(3000).pipe(
      map(() => {
        const rand = Math.random();
        return rand < 0.6
          ? genReactNotification()
          : rand < 0.8
          ? genSpreadNotification()
          : rand <= 1
          ? genFollowNotification()
          : genFollowNotification(); // never
      })
    );
  }

  post(text: string) {
    console.log(`[MockPlatform]Post:${text}`);
  }
}
