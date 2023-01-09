import { Injectable } from '@angular/core';
import { PlatformName } from './platform.service';

/**
 * LocalStorage/SessionStorage
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storeKey = 'ycl_StorageService';

  private _data: {
    accounts: {
      type: PlatformName;
      id: string;
      token: string;
      displayName: string | null;
    }[];
  } = {
    accounts: [],
  };

  private dataValidators = {
    accounts: [
      {
        type: (v: unknown) => typeof v === 'string' && this.nonNull(v),
        id: (v: unknown) => typeof v === 'string' && this.nonNull(v),
        token: (v: unknown) => typeof v === 'string' && this.nonNull(v),
        displayName: (v: unknown) => typeof v === 'string',
      },
    ],
  };

  private _isReady = false;

  private nonNull(v: unknown): boolean {
    return v !== null;
  }

  constructor() {
    this.load();
  }

  public get data() {
    return this.deepCopy(this._data);
  }

  public set data(newData: typeof this._data) {
    this.validateData(newData);
    this._data = newData;
    this.save();
  }

  private validateData(data: unknown): asserts data is typeof this._data {
    // TODO
  }

  public get isReady() {
    return this._isReady;
  }

  private save() {
    localStorage.setItem(this.storeKey, this.encode(this._data));
  }

  private load(): boolean {
    const stored = localStorage.getItem(this.storeKey);
    if (stored === null) return true;
    try {
      this._data = this.decode(stored);
      this._isReady = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  private encode(rawData: typeof this._data): string {
    return JSON.stringify(rawData);
  }

  private decode(encodedData: string): typeof this._data {
    const stored = JSON.parse(encodedData);
    this.validateData(stored);
    return stored;
  }

  private deepCopy<T>(val: T): T {
    return JSON.parse(JSON.stringify(val));
  }
}
