import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { interval, map } from 'rxjs';

faker.setLocale('ja');

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public okotoba$(type: 'mock') {
    switch (type) {
      case 'mock': {
        const genUserDetail = () => ({
          id: `@${faker.name.firstName()}@${faker.internet.domainName()}`,
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
    }
  }
}
