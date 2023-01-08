import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'ycl-poster',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export default class PosterComponent {
  text = new FormControl('');

  constructor(private platform: PlatformService) {}

  post() {
    if (this.text.value === null) {
      return;
    }

    this.platform.post('Mock', this.text.value);
  }
}
