import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../services/platform.service';
import { scan } from 'rxjs';
import { Subscribed } from '../../utils/utility-types';

@Component({
  selector: 'ycl-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export default class NotificationComponent {
  constructor(private platform: PlatformService) {}

  public notifications$ = this.platform.notification$('Mock').pipe(
    scan(
      (prev, now) => [...prev, now],
      [] as Subscribed<ReturnType<typeof this.platform.notification$>>[]
    ),
  );
}
