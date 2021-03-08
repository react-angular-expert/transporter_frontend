import { Component } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public model: IMyDateModel = null;
  public options: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'yyyy.mm.dd.',
    minYear: 2020,
    maxYear: 2050,
  };

  constructor(private readonly router: Router) {}

  public onDateChanged(event: IMyDateModel): void {
    this.router.navigate(['/home'], {
      queryParams: {
        dateRange: this.dateRangeToParams(event),
      },
    });
  }

  private dateRangeToParams(dates: IMyDateModel): string[] {
    if (dates.dateRange.beginJsDate && dates.dateRange.endJsDate)
      return [
        `${dates.dateRange.beginJsDate.getFullYear()}-${dates.dateRange.beginJsDate.getMonth()}-${dates.dateRange.beginJsDate.getDate()}`,
        `${dates.dateRange.endJsDate.getFullYear()}-${dates.dateRange.endJsDate.getMonth()}-${dates.dateRange.endJsDate.getDate()}`,
      ];
    else return [];
  }
}
