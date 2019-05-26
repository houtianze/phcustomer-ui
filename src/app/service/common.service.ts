import { Injectable, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Customer } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  title = 'Customers'
  customer: Customer
  constructor(private titleService: Title) { }

  public getTitle(): string {
    return this.title
  }

  public setTitle(title: string) {
    this.title = title
    this.titleService.setTitle(title)
  }
}
