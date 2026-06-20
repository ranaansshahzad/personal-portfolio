import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Theme state: 'dark' or 'light'
  private themeSignal = signal<'dark' | 'light'>('dark');
  
  // Public readonly theme signal
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    // Check localStorage or fallback to system preference (but default to dark as requested)
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.setTheme(prefersLight ? 'light' : 'dark');
    }
  }

  setTheme(theme: 'dark' | 'light') {
    this.themeSignal.set(theme);
    localStorage.setItem('portfolio-theme', theme);
    this.applyThemeToDOM(theme);
  }

  toggleTheme() {
    const nextTheme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  private applyThemeToDOM(theme: 'dark' | 'light') {
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
  }
}
