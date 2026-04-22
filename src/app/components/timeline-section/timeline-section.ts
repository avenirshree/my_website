import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { TimelineItem } from '../../models/portfolio';

@Component({
  selector: 'app-timeline-section',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './timeline-section.html',
  styleUrl: './timeline-section.scss',
})
export class TimelineSection {
  readonly timeline = input.required<TimelineItem[]>();
}
