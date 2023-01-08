import { Injectable } from '@angular/core';
import { Notification, NotificationKind, Okotoba, Platform } from './platforms/platform';
import { MisskeyService } from './platforms/misskey.service';
import { MockService } from './platforms/mock.service';
import { Observable } from 'rxjs';

type PlatformName = 'Misskey' | 'Mock';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private Misskey: MisskeyService, private Mock: MockService) {}

  private platformOf(type: PlatformName): Platform {
    return (() => {
      switch (type) {
        case 'Misskey':
          return this.Misskey;
        case 'Mock':
          return this.Mock;
      }
    })();
  }

  public okotoba$(type: PlatformName): Observable<Okotoba> {
    return this.platformOf(type).okotoba$();
  }

  public notification$(type: PlatformName): Observable<Notification<NotificationKind>> {
    return this.platformOf(type).notification$();
  }

  public post(type: PlatformName, text: string): void {
    return this.platformOf(type).post(text);
  }
}
