import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollerComponent implements OnInit {
  @Input() items = [];

  constructor() {}

  ngOnInit(): void {}
}
