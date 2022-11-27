import { Injectable } from '@angular/core';
import { MisskeyService } from './platforms/misskey.service';
import { MockService } from './platforms/mock.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private Mock: MockService, private Misskey: MisskeyService) {}

  public okotoba$(type: 'misskey' | 'mock') {
    switch (type) {
      case 'misskey': {
        // return this.Misskey.okotoba$();
        return this.Mock.okotoba$();
      }
      case 'mock': {
        return this.Mock.okotoba$();
      }
    }
  }
}
