import { Component, OnInit, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { Profile } from '../../models/portfolio';

@Component({
  selector: 'app-about-section',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
})
export class AboutSection implements OnInit {
  readonly profile = input.required<Profile>();
  readonly skills = input.required<string[]>();

  protected readonly animatedProjects = signal(0);
  protected readonly animatedExperience = signal(0);
  protected readonly animatedApps = signal(0);

  ngOnInit(): void {
    const stats = this.profile().stats;
    this.animateValue(stats.projects, this.animatedProjects);
    this.animateValue(stats.yearsExperience, this.animatedExperience);
    this.animateValue(stats.appsLaunched, this.animatedApps);
  }

  private animateValue(target: number, state: ReturnType<typeof signal<number>>): void {
    const duration = 1400;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      state.set(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}
