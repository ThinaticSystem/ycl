import { Injectable, Injector } from '@angular/core';
import type { MisskeyService } from './misskey.service';
import type { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadPlatformsService {
  cache = {
    Misskey: null as MisskeyService | null,
    Mock: null as MockService | null,
  };

  constructor(private injector: Injector) {}

  async existen(type: keyof typeof this.cache) {
    // キャッシュ済み
    if (this.cache[type] !== null) {
      return this.cache[type] as NonNullable<typeof this.cache[typeof type]>;
    }

    // 読み込んでキャッシュ
    this.cache[type] = this.injector.get(
      await (() =>
        import(`./${type.toLowerCase()}.service`).then(
          m => m[`${type}Service`]
        )
      )()
    );
    return this.cache[type] as NonNullable<typeof this.cache[typeof type]>;
  }
}
