import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushService } from '../../services/push.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ycl-poster',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export default class PosterComponent {
  text = new FormControl('');

  constructor(private push: PushService) {}

  post() {
    if (this.text.value === null) {
      return;
    }

    this.push.post('mock', this.text.value);
  }
}
