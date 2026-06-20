import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitted = signal<boolean>(false);
  isSending = signal<boolean>(false);

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    // Reveal contact info & form columns
    gsap.fromTo('.contact-info-col',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.contact-form-col',
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSending.set(true);

      // Simulate API network latency (1.5 seconds)
      setTimeout(() => {
        this.isSending.set(false);
        this.isSubmitted.set(true);
        this.animateSuccessState();
      }, 1500);
    } else {
      // Mark all fields as touched to display validation warnings
      this.contactForm.markAllAsTouched();
    }
  }

  private animateSuccessState() {
    // Fade out form and slide in success card
    gsap.fromTo('.success-card',
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        delay: 0.1
      }
    );

    // Animate checkmark path draw
    gsap.fromTo('.checkmark-path',
      { strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.3
      }
    );
  }

  resetForm() {
    this.isSubmitted.set(false);
    this.contactForm.reset();
  }
}
