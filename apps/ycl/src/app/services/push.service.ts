import { Injectable } from '@angular/core';
import { MisskeyService } from './platforms/misskey.service';
import { MockService } from './platforms/mock.service';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  constructor(private Mock: MockService, private Misskey: MisskeyService) {}

  post(type: 'misskey' | 'mock', text: string) {
    switch (type) {
      case 'misskey': {
        this.Misskey.post(text);
        return;
      }
      case 'mock': {
        this.Mock.post(text);
        return;
      }
    }
  }
}
