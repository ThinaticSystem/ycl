import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, scan } from 'rxjs';
import { ContentService } from '../../service/content.service';

type Subscribed<T> = T extends Observable<infer R> ? R : never;

@Component({
  selector: 'ycl-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export default class TimelineComponent {

  public okotoba$ = this.content
    .okotoba$('mock')
    .pipe(
      scan(
        (prev, now) => [...prev, now],
        [] as Subscribed<ReturnType<typeof this.content.okotoba$>>[]
      ),
    );

  constructor(private content: ContentService) {}

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
}
