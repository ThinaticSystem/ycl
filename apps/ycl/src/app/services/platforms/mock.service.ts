import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { interval, map } from 'rxjs';
import { Platform } from './platform';

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

  post(text: string) {
    console.log(`[MockPlatform]Post:${text}`);
  }
}
