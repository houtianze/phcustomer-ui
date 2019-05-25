import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'phcustomer-ui';
  private title = 'Customers';

  public constructor(private titleService: Title) {
    this.setTitle(this.title)
  }

  public setTitle(title) {
    this.title = title
    this.titleService.setTitle(title)
  }
}
