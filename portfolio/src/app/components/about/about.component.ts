import { Component, AfterViewInit, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('statsGrid') statsGrid!: ElementRef;

  // Stats signals for counter animation
  experienceCount = signal<number>(0);
  projectsCount = signal<number>(0);
  certificationsCount = signal<number>(0);
  clientsCount = signal<number>(0);

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    // 1. Text entrance stagger
    gsap.fromTo('.about-text-content > *', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-text-content',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Stats cards slide-up & stagger
    gsap.fromTo('.stat-card', 
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.about-stats-side',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Stats counters increment animation
    const statsObj = { exp: 0, proj: 0, certs: 0, clients: 0 };
    
    gsap.to(statsObj, {
      exp: 5,
      proj: 50,
      certs: 6,
      clients: 20,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-stats-side',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        this.experienceCount.set(Math.floor(statsObj.exp));
        this.projectsCount.set(Math.floor(statsObj.proj));
        this.certificationsCount.set(Math.floor(statsObj.certs));
        this.clientsCount.set(Math.floor(statsObj.clients));
      }
    });
  }
}
