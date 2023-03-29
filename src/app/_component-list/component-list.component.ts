import { Component, OnInit } from '@angular/core';
import { paths } from '../app.module';

@Component({
  selector: 'app--component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css'],
})
export class ComponentListComponent implements OnInit {
  constructor() {}

  readonly paths = paths;
  ngOnInit() {}
}
