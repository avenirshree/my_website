import { Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AboutSection } from './components/about-section/about-section';
import { AppsSection } from './components/apps-section/apps-section';
import { ContactSection } from './components/contact-section/contact-section';
import { HeroSection } from './components/hero-section/hero-section';
import { ProjectsSection } from './components/projects-section/projects-section';
import { TimelineSection } from './components/timeline-section/timeline-section';
import { PortfolioData } from './models/portfolio';
import { PortfolioDataService } from './services/portfolio-data';

@Component({
  selector: 'app-root',
  imports: [
    HeroSection,
    AboutSection,
    ProjectsSection,
    AppsSection,
    TimelineSection,
    ContactSection,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly portfolioDataService = inject(PortfolioDataService);

  protected readonly isDarkMode = signal(false);
  protected readonly portfolioData = signal<PortfolioData | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly loadError = signal('');

  protected readonly currentYear = new Date().getFullYear();
  protected readonly navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Projects', target: '#projects' },
    { label: 'Apps', target: '#apps' },
    { label: 'Journey', target: '#journey' },
    { label: 'Contact', target: '#contact' },
  ];

  protected readonly profile = computed(() => this.portfolioData()?.profile ?? null);
  protected readonly skills = computed(() => this.portfolioData()?.skills ?? []);
  protected readonly projects = computed(() => this.portfolioData()?.projects ?? []);
  protected readonly apps = computed(() => this.portfolioData()?.apps ?? []);
  protected readonly timeline = computed(() => this.portfolioData()?.timeline ?? []);
  protected readonly displayName = computed(() => this.profile()?.name ?? 'Aarav Mehta');
  protected readonly initials = computed(() =>
    this.displayName()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  );

  constructor() {
    this.initializeTheme();
    this.loadPortfolioData();
  }

  protected toggleTheme(): void {
    const nextTheme = !this.isDarkMode();
    this.applyTheme(nextTheme);
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(storedTheme ? storedTheme === 'dark' : prefersDark);
  }

  private applyTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }

  private loadPortfolioData(): void {
    this.portfolioDataService.getPortfolioData().subscribe({
      next: (data) => {
        this.portfolioData.set(data);
        this.isLoading.set(false);
      },
    });
  }
}
