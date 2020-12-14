import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarComponent implements OnInit {
  @Input() message: string;
  @Input() action: string;

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  close = () => {
    this.snackbar.dismiss();
  };
}
