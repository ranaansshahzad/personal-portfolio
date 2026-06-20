import { Component, AfterViewInit, ElementRef, ViewChild, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('headline') headline!: ElementRef;
  @ViewChild('subheadline') subheadline!: ElementRef;
  @ViewChild('ctaButtons') ctaButtons!: ElementRef;
  @ViewChild('socials') socials!: ElementRef;
  @ViewChild('visualContainer') visualContainer!: ElementRef;

  // Typing effect variables
  typedText = signal<string>('');
  private fullTexts = [
    'Dynamics 365 CRM Consultant',
    'Power Platform Consultant',
    'Low-Code Solutions Architect',
    'Workflow Automator'
  ];
  private currentTextIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;

  ngAfterViewInit() {
    this.startTypingEffect();
    this.initGsapAnimations();
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  private startTypingEffect() {
    const currentText = this.fullTexts[this.currentTextIndex];
    
    if (this.isDeleting) {
      // Deleting characters
      this.typedText.set(currentText.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      // Typing characters
      this.typedText.set(currentText.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      // Pause at the end of typing
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      // Done deleting, move to next text
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.fullTexts.length;
      typeSpeed = 500;
    }

    this.typingTimeout = setTimeout(() => this.startTypingEffect(), typeSpeed);
  }

  private initGsapAnimations() {
    // 1. Text reveals
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.greeting', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    
    tl.fromTo(this.headline.nativeElement, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    );
    
    tl.fromTo('.typing-wrapper', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.5'
    );

    tl.fromTo(this.subheadline.nativeElement, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );

    tl.fromTo(this.ctaButtons.nativeElement.children, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.6'
    );

    tl.fromTo('.social-icon', 
      { opacity: 0, scale: 0.5 }, 
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.4'
    );

    // Fade in profile visual area
    tl.fromTo(this.visualContainer.nativeElement, 
      { opacity: 0, x: 50, scale: 0.95 }, 
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=1.2'
    );

    // 2. Continuous Floating animations for visual elements
    gsap.to('.float-element-1', {
      y: -15,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.float-element-2', {
      y: 15,
      x: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.5
    });

    gsap.to('.float-element-3', {
      y: -10,
      x: -15,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1
    });

    // 3. Subtle background dynamic gradient shift
    gsap.to('.hero-glow-1', {
      x: '10%',
      y: '5%',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to('.hero-glow-2', {
      x: '-10%',
      y: '-5%',
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });
  }

  scrollToContact() {
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
