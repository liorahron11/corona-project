import { Component, OnInit } from '@angular/core';
import { faShieldVirus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  virusIcon = faShieldVirus;

  constructor() {}

  ngOnInit(): void {}
}
