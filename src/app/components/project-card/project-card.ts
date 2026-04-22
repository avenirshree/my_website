import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { Project } from '../../models/portfolio';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
