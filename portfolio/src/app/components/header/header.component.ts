import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  
  // Mobile menu open state
  isMobileMenuOpen = signal<boolean>(false);
  
  // Header scrolled state (to add extra contrast when scrolled)
  isScrolled = signal<boolean>(false);
  
  // Active navigation section
  activeSection = signal<string>('hero');

  navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      // Check if page is scrolled
      this.isScrolled.set(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100; // offset for header height
      
      for (const item of this.navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            this.activeSection.set(item.id);
          }
        }
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
    
    // Prevent body scrolling when mobile menu is open
    if (typeof document !== 'undefined') {
      if (this.isMobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollToSection(id: string, event: Event) {
    event.preventDefault();
    this.closeMobileMenu();
    
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      this.activeSection.set(id);
    }
  }
}
