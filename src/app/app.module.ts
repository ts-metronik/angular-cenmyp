import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Table1Component } from './heineken/table1/table1.component';
import { ComponentListComponent } from './_component-list/component-list.component';
import { LineGaugeComponent } from './line-gauge/line-gauge.component';
import { SvgUpDownIndicatorComponent } from './svg-up-down-indicator/svg-up-down-indicator.component';
import { RegressionChartWraperComponent } from './regression-chart-wraper/regression-chart.component';
import { SharedModule } from '../shared/shared.module';

export const paths = [
  { path: '', component: ComponentListComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'heineken/table1', component: Table1Component },
  { path: 'line-gauge', component: LineGaugeComponent },
  { path: 'svg-upDownIndicator', component: SvgUpDownIndicatorComponent },
  { path: 'regression-chart', component: RegressionChartWraperComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(paths),
    SharedModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ComponentListComponent,
    ProductListComponent,
    Table1Component,
    LineGaugeComponent,
    SvgUpDownIndicatorComponent,
    RegressionChartWraperComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
