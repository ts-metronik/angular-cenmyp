import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts';

@Component({
  selector: 'app-regression-chart-wraper',
  templateUrl: './regression-chart.component.html',
  styleUrls: ['./regression-chart.component.scss'],
})
export class RegressionChartWraperComponent implements OnInit, AfterViewInit {
  readonly instanceId = Math.round(Math.random() * (1000000 + 1));
  readonly chartId = 'regression-chart-' + this.instanceId;
  chartInstance = undefined;

  type = 'mt';

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const data = this.data;

    const { result_values, max_x, max_y, min_x, min_y } =
      findLineByLeastSquares(data);

    this.settings.xAxis = {
      ...this.settings.xAxis,
      max: max_x,
      min: min_x,
    };
    this.settings.yAxis = {
      ...this.settings.yAxis,
      max: max_y,
      min: min_y,
      startOnTick: false,
    };

    let lineData = [];

    result_values.forEach((v) => {
      lineData.push([v.x, v.y]);
    });

    this.lineSettings.data = result_values;
    this.settings.series = [this.lineSettings];
    //this.settings.series[1].data = data;

    this.data.forEach((d) => {
      //let date = new Date(d.utcTimestamp);
      //let name = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
      this.settings.series.push({
        type: 'scatter',
        id: d.utcTimestamp,
        name: this.getName(d),
        data: [[d.x, d.y]],
        marker: {
          radius: 3,
          enabled: true,
        },
        //selected: false, //!d.disabled,
        visible: !d.disabled,
        events: {
          hide: (eve) => {
            const series = eve.target as any as Highcharts.Series;
            console.debug('hide ser', eve, {
              name: series.name,
              series,
            });

            this.disablePoint(series.name);

            this.createChart();

            // const { result_values } = findLineByLeastSquares(data);

            // let lineData = [];

            // result_values.forEach((v) => {
            //   lineData.push([v.x, v.y]);
            // });

            //series.setData(lineData);
          },
          show: (eve) => {
            const series = eve.target as any as Highcharts.Series;
            console.debug('show ser', eve, {
              name: series.name,
              series,
            });

            this.enablePoint(series.name);

            this.createChart();

            // const { result_values } = findLineByLeastSquares(data);

            // let lineData = [];

            // result_values.forEach((v) => {
            //   lineData.push([v.x, v.y]);
            // });

            //series.setData(lineData);
          },
        },
      });
    });

    try {
      this.chartInstance = Highcharts.chart(
        this.chartId,
        this.settings,
        (cb) => {
          console.debug(
            new Date().toISOString(),
            ' - Reghression chart creation callback ',
            this.chartId,
            cb
          );
        }
      );
    } catch (e) {
      console.error('Reghression chart -- failed to create component', e);
    }
  }

  getName(d) {
    return d.utcTimestamp.substring(0, 19).replace('T', ' ');
  }

  disablePoint(name: string) {
    const point = this.data.find((d) => this.getName(d) === name);
    point.disabled = true;
  }
  enablePoint(name: string) {
    const point = this.data.find((d) => this.getName(d) === name);
    delete point.disabled;
  }

  lineSettings = {
    type: 'line',
    name: 'Regression Line',
    data: [
      [0, 1.11],
      [5, 4.51],
    ],
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    //enableMouseTracking: false,
  };

  settings: Highcharts.Options = {
    title: {
      text: 'Scatter plot with regression line',
    },
    xAxis: {
      min: -0.5,
      max: 5.5,
    },
    yAxis: {
      min: 0,
    },
    series: [
      {
        type: 'line',
        name: 'Regression Line',
        data: [
          [0, 1.11],
          [5, 4.51],
        ],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
      // {
      //   type: 'scatter',
      //   name: 'Observations',
      //   data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
      //   marker: {
      //     //radius: 4,
      //   },
      // },
    ],
    rangeSelector: {
      enabled: true,
    },
    chart: {
      zooming: {
        type: 'xy',
      },
    },
  };

  data = [
    {
      x: 291643.8125,
      y: -516.95822983851352,
      utcTimestamp: '2022-01-01T00:00:00.0000000Z',
    },
    {
      x: 306358.09375,
      y: -28.599697280958903,
      utcTimestamp: '2022-01-02T00:00:00.0000000Z',
      disabled: true,
    },
    {
      x: 294482.1875,
      y: 17.449047584863134,
      utcTimestamp: '2022-01-03T00:00:00.0000000Z',
      disabled: true,
    },
    {
      x: 295200.8125,
      y: -16.290651928651304,
      utcTimestamp: '2022-01-04T00:00:00.0000000Z',
    },
    {
      x: 304980.15625,
      y: -36.33268860010258,
      utcTimestamp: '2022-01-05T00:00:00.0000000Z',
    },
    {
      x: 290823.9375,
      y: 72.94667753439074,
      utcTimestamp: '2022-01-06T00:00:00.0000000Z',
    },
    {
      x: 302826.71875,
      y: -31.56637421212807,
      utcTimestamp: '2022-01-07T00:00:00.0000000Z',
    },
    {
      x: 277571.125,
      y: 59.40460890416173,
      utcTimestamp: '2022-01-08T00:00:00.0000000Z',
    },
    {
      x: 282386.03125,
      y: 55.874029432691806,
      utcTimestamp: '2022-01-09T00:00:00.0000000Z',
    },
    {
      x: 328780.15625,
      y: -34.4693497990958,
      utcTimestamp: '2022-01-10T00:00:00.0000000Z',
    },
    {
      x: 294187.09375,
      y: -1.3032278265938184,
      utcTimestamp: '2022-01-11T00:00:00.0000000Z',
    },
    {
      x: 312394.34375,
      y: -6.911932716158221,
      utcTimestamp: '2022-01-12T00:00:00.0000000Z',
    },
    {
      x: 312601.3125,
      y: -9.003792625475462,
      utcTimestamp: '2022-01-13T00:00:00.0000000Z',
    },
    {
      x: 317157.125,
      y: -40.188484005100364,
      utcTimestamp: '2022-01-14T00:00:00.0000000Z',
    },
    {
      x: 312196.5,
      y: -48.21375061682075,
      utcTimestamp: '2022-01-15T00:00:00.0000000Z',
    },
    {
      x: 320370.3125,
      y: -47.948673718681555,
      utcTimestamp: '2022-01-16T00:00:00.0000000Z',
    },
    {
      x: 281944.6875,
      y: 54.996767992704434,
      utcTimestamp: '2022-01-17T00:00:00.0000000Z',
    },
    {
      x: 318679.4375,
      y: -47.45671790219554,
      utcTimestamp: '2022-01-18T00:00:00.0000000Z',
    },
    {
      x: 303753.3125,
      y: -13.918129540828733,
      utcTimestamp: '2022-01-19T00:00:00.0000000Z',
    },
    {
      x: 298511.1875,
      y: 24.277307159815837,
      utcTimestamp: '2022-01-20T00:00:00.0000000Z',
    },
    {
      x: 303621.40625,
      y: -45.95973060159068,
      utcTimestamp: '2022-01-21T00:00:00.0000000Z',
    },
    {
      x: 288204.78125,
      y: 11.478569981989047,
      utcTimestamp: '2022-01-22T00:00:00.0000000Z',
    },
    {
      x: 331921.0625,
      y: -106.94544040681629,
      utcTimestamp: '2022-01-23T00:00:00.0000000Z',
    },
    {
      x: 307386.34375,
      y: -1.5602052418826324,
      utcTimestamp: '2022-01-24T00:00:00.0000000Z',
    },
    {
      x: 297215.5,
      y: -32.4862725145919,
      utcTimestamp: '2022-01-25T00:00:00.0000000Z',
    },
    {
      x: 300953.8125,
      y: -41.90986370439141,
      utcTimestamp: '2022-01-26T00:00:00.0000000Z',
    },
    {
      x: 306011.34375,
      y: -18.805902012859214,
      utcTimestamp: '2022-01-27T00:00:00.0000000Z',
    },
    {
      x: 300762.90625,
      y: -8.057343453595667,
      utcTimestamp: '2022-01-28T00:00:00.0000000Z',
    },
    {
      x: 314642.6875,
      y: 22.276470017752782,
      utcTimestamp: '2022-01-29T00:00:00.0000000Z',
    },
    {
      x: 314995.71875,
      y: -0.9243983099799454,
      utcTimestamp: '2022-01-30T00:00:00.0000000Z',
    },
    {
      x: 304538.53125,
      y: -31.269631863015626,
      utcTimestamp: '2022-01-31T00:00:00.0000000Z',
    },
    {
      x: 308073.40625,
      y: -29.802443820817736,
      utcTimestamp: '2022-02-01T00:00:00.0000000Z',
    },
    {
      x: 310857.375,
      y: 2.0860303818469492,
      utcTimestamp: '2022-02-02T00:00:00.0000000Z',
    },
    {
      x: 292309.28125,
      y: -8.847192482364672,
      utcTimestamp: '2022-02-03T00:00:00.0000000Z',
    },
    {
      x: 293479.625,
      y: 44.94728582327022,
      utcTimestamp: '2022-02-04T00:00:00.0000000Z',
    },
  ];
}

function findLineByLeastSquares(
  values: { x: number; y: number; disabled?: boolean }[]
) {
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var count = 0;

  let max_x = undefined;
  let max_y = undefined;
  let min_x = undefined;
  let min_y = undefined;

  /*
   * We'll use those variables for faster read/write access.
   */
  var x = 0;
  var y = 0;
  var values_length = values.length;

  /*
   * Nothing to do.
   */
  if (values_length === 0) {
    return {
      result_values,
      m,
      b,
      sum_x,
      sum_y,
      sum_xx,
      sum_xy,
      count,

      max_x,
      max_y,
      min_x,
      min_y,
    };
  }

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (var v = 0; v < values_length; v++) {
    if (values[v].disabled) {
      continue;
    }
    x = values[v].x;
    y = values[v].y;
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;

    if (max_x === undefined || x > max_x) {
      max_x = x;
    }
    if (max_y === undefined || y > max_y) {
      max_y = y;
    }
    if (min_x === undefined || x < min_x) {
      min_x = x;
    }
    if (min_y === undefined || y < min_y) {
      min_y = y;
    }
  }

  /*
   * Calculate m and b for the formular:
   * y = x * m + b
   */
  var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  var b = sum_y / count - (m * sum_x) / count;

  /*
   * We will make the x and y result line now
   */
  var result_values: { x: number; y: number; disabled?: boolean }[] = [];

  for (var v = 0; v < values_length; v++) {
    x = values[v].x;
    y = x * m + b;
    let result = { x, y };
    if (values[v].disabled) {
      (result as any).disabled = true;
    }

    result_values.push({ x, y });
  }

  return {
    result_values,
    m,
    b,
    sum_x,
    sum_y,
    sum_xx,
    sum_xy,
    count,

    max_x,
    max_y,
    min_x,
    min_y,
  };
}

//take an array of triplets (x, y, r) where r is the weight of the (x, y) data point
// and return [a, b] such that Y = a*X + b approximate the data.
// return (a, b) that minimize
// sum_i r_i * (a*x_i+b - y_i)^2
function linear_regression(xyr: [number, number, number][]) {
  var i,
    x,
    y,
    r,
    sumx = 0,
    sumy = 0,
    sumx2 = 0,
    sumy2 = 0,
    sumxy = 0,
    sumr = 0,
    a,
    b;

  for (i = 0; i < xyr.length; i++) {
    // this is our data pair
    x = xyr[i][0];
    y = xyr[i][1];

    // this is the weight for that pair
    // set to 1 (and simplify code accordingly, ie, sumr becomes xy.length) if weighting is not needed
    r = xyr[i][2] || 1;

    // consider checking for NaN in the x, y and r variables here
    // (add a continue statement in that case)

    sumr += r;
    sumx += r * x;
    sumx2 += r * (x * x);
    sumy += r * y;
    sumy2 += r * (y * y);
    sumxy += r * (x * y);
  }

  // note: the denominator is the variance of the random variable X
  // the only case when it is 0 is the degenerate case X==constant
  b = (sumy * sumx2 - sumx * sumxy) / (sumr * sumx2 - sumx * sumx);
  a = (sumr * sumxy - sumx * sumy) / (sumr * sumx2 - sumx * sumx);

  return [a, b];
}

function split(arr: any[], a: string | number, b: string | number) {
  const x = [];
  const y = [];

  arr.forEach((item) => {
    x.push(item[a]);
    y.push(item[b]);
  });

  return [x, y];
}

function join(x: any[], y: any[]) {
  const reult = [];

  x.forEach((val, i) => {
    reult.push([val, y[i]]);
  });

  return reult;
}
