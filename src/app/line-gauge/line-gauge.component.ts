import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-gauge',
  templateUrl: './line-gauge.component.html',
  styleUrls: ['./line-gauge.component.scss'],
})
export class LineGaugeComponent implements OnInit {
  constructor() {}

  procent = 40;
  value = this.procent;
  unit = '%';

  ngOnInit() {}
}
