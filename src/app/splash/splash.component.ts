import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <h1>
      Welcome to this Angular thing
    </h1>
  `,
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
