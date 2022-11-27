import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PlatForm } from './platform';

@Injectable({
  providedIn: 'root'
})
export class MisskeyService implements PlatForm {
  okotoba$() {
    return of<any>(null); // TODO
  }
}
