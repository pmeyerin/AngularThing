import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [
  //   HomeComponent,
  //   HeaderComponent,
  //   RouterModule,
  // ],
  template: `
    <main>
      <app-home></app-home>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'An Angular Thing';
}
