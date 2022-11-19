import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ycl-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export default class PosterComponent implements OnInit {
  ngOnInit(): void {
    console.log('honi')
  }
}
