import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../service/content.service';
import { Observable, scan } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { ScrollingModule } from '@angular/cdk/scrolling'

type Subscribed<T> = T extends Observable<infer R> ? R : never;

@Component({
  selector: 'ycl-futomomo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule, ScrollingModule],
  templateUrl: './futomomo.component.html',
  styleUrls: ['./futomomo.component.scss'],
})
export default class FutomomoComponent {
  public okotoba$ = this.content
    .okotoba$('mock')
    .pipe(
      scan(
        (prev, now) => [...prev, now],
        [] as Subscribed<ReturnType<typeof this.content.okotoba$>>[]
      ),
    );

  constructor(private content: ContentService, private router: Router) {}

  public htmlFuncs = {
    object: {
      length: (obj: Record<string, unknown>) => Object.keys(obj).length,
    },
    converters: {
      classifyReactsByEmoji: (
        reacts: Subscribed<ReturnType<typeof this.content.okotoba$>>['reacts']
      ) => {
        const temp: {
          normal: typeof reacts;
          withEmoji: { [emoji in string]: typeof reacts };
        } = {
          normal: [],
          withEmoji: {},
        };

        for (const react of reacts) {
          if (react.emoji || react.emoji === '') {
            if (!temp.withEmoji[react.emoji]) {
              temp.withEmoji[react.emoji] = [];
            }
            temp.withEmoji[react.emoji].push(react);
            continue;
          }

          temp.normal.push(react);
        }

        return temp;
      },
    },
  };

  public putPart(partType: 'poster') {
    // this.router.navigate([{ outlets: { part1: [partType] } }], { skipLocationChange: true });
    this.router.navigate([{ outlets: { part1: partType } }], { skipLocationChange: true });
  }
}
