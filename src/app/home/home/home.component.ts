import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store';
import { Transport, Passenger, Booking, LocationHungary, LocationSerbia } from '../../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public passenger$: Observable<Passenger>;
  public bookings$: Observable<Booking[]>;
  public transports$: Observable<Transport[]>;
  public LocationHungary = LocationHungary;
  public LocationSerbia = LocationSerbia;
  public startDate?: Date;
  public endDate?: Date;

  constructor(private readonly rootStore: Store<fromRoot.State>, private readonly route: ActivatedRoute) {
    this.passenger$ = this.rootStore.select('auth').pipe(map((state) => state.passenger));
    this.bookings$ = this.rootStore.select('bookings').pipe(map((state) => this.sortByDate(state.bookings)));
    this.transports$ = this.rootStore.select('transports').pipe(map((state) => this.sortByDate(state.transports)));
  }

  public ngOnInit(): void {
    this.rootStore.dispatch(fromRoot.FetchTransports());
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('dateRange') && !!params) {
        this.startDate = new Date(params.getAll('dateRange')[0]);
        this.endDate = new Date(params.getAll('dateRange')[1]);
      }
    });
  }

  public filterByDateRangeValidation(transport: Transport): boolean {
    const departureTime = new Date(transport.departureTime[0], transport.departureTime[1], transport.departureTime[2]);
    if (
      (this.startDate && this.endDate && departureTime >= this.startDate && departureTime <= this.endDate) ||
      (!this.startDate && !this.endDate)
    )
      return true;
    else return false;
  }

  public onDeleteBooking(id: number): void {
    if (confirm('Biztosan törölni akarod a lefoglalt fuvart?')) {
      this.rootStore.dispatch(fromRoot.DeleteBooking({ id }));
    }
  }

  private sortByDate(array: any[], range?: string[]) {
    if (range && range.length > 0) {
      array = array.filter(
        (t) =>
          new Date(t.departureTime[0], t.departureTime[1], t.departureTime[2]) >= new Date(range[0]) &&
          new Date(t.departureTime[0], t.departureTime[1], t.departureTime[2]) <= new Date(range[1]),
      );
    }
    return array.sort(
      (a, b) =>
        new Date(a.departureTime[0], a.departureTime[1] - 1, a.departureTime[2], a.departureTime[3], a.departureTime[4]).getTime() -
        new Date(b.departureTime[0], b.departureTime[1] - 1, b.departureTime[2], b.departureTime[3], a.departureTime[4]).getTime(),
    );
  }
}
