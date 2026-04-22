import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Profile } from '../../models/portfolio';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  readonly profile = input.required<Profile>();

  protected readonly initials = computed(() =>
    this.profile()
      .name.split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  );
}
