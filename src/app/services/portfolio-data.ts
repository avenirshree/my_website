import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { PortfolioData } from '../models/portfolio';
import { PORTFOLIO_FALLBACK_DATA } from '../data/portfolio-fallback';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  private readonly http = inject(HttpClient);

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('assets/data/portfolio-data.json').pipe(
      catchError(() => of(PORTFOLIO_FALLBACK_DATA))
    );
  }
}
