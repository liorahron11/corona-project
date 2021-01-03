import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;
  @Input() public icon: IconDefinition;

  constructor() {}

  ngOnInit(): void {}
}
