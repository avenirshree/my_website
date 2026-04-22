import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { ShowcaseApp } from '../../models/portfolio';

@Component({
  selector: 'app-app-card',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './app-card.html',
  styleUrl: './app-card.scss',
})
export class AppCard {
  readonly app = input.required<ShowcaseApp>();
}
