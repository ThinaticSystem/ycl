import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Platform } from './platform';

@Injectable({
  providedIn: 'root',
})
export class MisskeyService implements Platform {
  okotoba$() {
    return of<any>(null); // TODO
  }

  post(text: string) {}
}
