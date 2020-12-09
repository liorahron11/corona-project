import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent implements OnInit {
  items = Array.from({ length: 100 }).map((_, i) => `Item #${i}`);

  constructor() {}

  ngOnInit(): void {}
}
