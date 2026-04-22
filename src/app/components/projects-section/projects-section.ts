import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll';
import { Project, ProjectCategory } from '../../models/portfolio';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects-section',
  imports: [CommonModule, RevealOnScrollDirective, ProjectCard],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
})
export class ProjectsSection {
  readonly projects = input.required<Project[]>();

  protected readonly categories: Array<'All' | ProjectCategory> = ['All', 'Web', 'App', 'AI'];
  protected readonly activeCategory = signal<'All' | ProjectCategory>('All');
  protected readonly searchTerm = signal('');

  protected readonly filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const activeCategory = this.activeCategory();

    return this.projects().filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesTerm =
        !term ||
        project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(term));

      return matchesCategory && matchesTerm;
    });
  });

  protected setCategory(category: 'All' | ProjectCategory): void {
    this.activeCategory.set(category);
  }

  protected updateSearch(term: string): void {
    this.searchTerm.set(term);
  }
}
