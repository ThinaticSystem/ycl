import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import TimelineComponent from '../../parts/timeline/timeline.component';
import PosterComponent from '../../parts/poster/poster.component';

@Component({
  selector: 'ycl-futomomo',
  standalone: true,
  templateUrl: './futomomo.component.html',
  styleUrls: ['./futomomo.component.scss'],
  imports: [CommonModule, TimelineComponent, PosterComponent],
})
export default class FutomomoComponent {
  public appearParts: ('timeline' | 'poster')[] = [];

  public addPart(partType: 'timeline' | 'poster') {
    this.appearParts.push(partType);
  }

  public removePart(index: number) {
    this.appearParts = this.appearParts.filter((_v, i) => i != index);
  };
}
