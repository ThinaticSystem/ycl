import { Observable } from "rxjs";

type Subscribed<T> = T extends Observable<infer R> ? R : never;
