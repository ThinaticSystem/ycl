import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import TimelineComponent from '../../parts/timeline/timeline.component';
import PosterComponent from '../../parts/poster/poster.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ycl-futomomo',
  standalone: true,
  templateUrl: './futomomo.component.html',
  styleUrls: ['./futomomo.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    TimelineComponent,
    PosterComponent,
  ],
})
export default class FutomomoComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<null>();
  readonly PartsList = ['timeline', 'poster'] as const;

  public appearParts: typeof this.PartsList[number][] = [];
  public editMode = false;
  public f_newPart = new FormControl<typeof this.PartsList[number] | null>(null);

  ngOnInit() {
    this.f_newPart.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        if (value === null) {
          return;
        }
        this.addPart(value);
        this.f_newPart.reset();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  public addPart(part: typeof this.PartsList[number]) {
    if (this.f_newPart.value === null) {
      return;
    }
    this.appearParts.push(part);
  }

  public removePart(index: number) {
    this.appearParts = this.appearParts.filter((_v, i) => i != index);
  }

  public onDrop(event: CdkDragDrop<typeof this.appearParts>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
