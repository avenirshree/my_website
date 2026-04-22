import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { ShowcaseApp } from '../../models/portfolio';
import { AppCard } from '../app-card/app-card';

@Component({
  selector: 'app-apps-section',
  imports: [CommonModule, RevealOnScrollDirective, AppCard],
  templateUrl: './apps-section.html',
  styleUrl: './apps-section.scss',
})
export class AppsSection {
  readonly apps = input.required<ShowcaseApp[]>();
}
