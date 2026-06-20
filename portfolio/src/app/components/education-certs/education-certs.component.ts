import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
}

interface Publication {
  title: string;
  publisher: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-education-certs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-certs.component.html',
  styleUrl: './education-certs.component.scss'
})
export class EducationCertsComponent implements AfterViewInit {
  educationList: Education[] = [
    {
      degree: "Master's of Science - MSc in Computer Science",
      institution: 'University of Engineering and Technology (UET)',
      period: '2023 – 2025',
      location: 'Lahore, Punjab, Pakistan'
    },
    {
      degree: 'Bachelor of Science - BSCS in Computer Science',
      institution: 'Superior University',
      period: '2018 – 2022',
      location: 'Lahore, Punjab, Pakistan'
    }
  ];

  certifications: Certification[] = [
    {
      title: 'Microsoft Power Platform Fundamentals',
      issuer: 'Microsoft',
      date: 'May 2023'
    },
    {
      title: 'Artificial Intelligence & Law',
      issuer: 'Lund University',
      date: 'Nov 2023'
    },
    {
      title: 'Agile Management',
      issuer: 'MindLuster',
      date: 'Mar 2025'
    },
    {
      title: 'Information Security Fundamentals (Modules 1, 2, 3)',
      issuer: 'Visionet Systems',
      date: 'Nov 2022'
    }
  ];

  publication: Publication = {
    title: 'A Comprehensive Review of Cyber Threat Modeling and Phishing Resilience in Microsoft 365 Cloud Ecosystem',
    publisher: 'International Journal of Computer Science and Technology (ijcst.org)',
    link: 'https://www.ijcst.org/Volume16/Issue1/p2_16_1.pdf',
    description: 'A research publication reviewing the cyber threat landscapes, risk modeling, and operational phishing resilience tactics for organizations deployed on the Microsoft 365 cloud platform.'
  };

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    // Staggered column entry
    gsap.fromTo('.edu-col',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.25,
        scrollTrigger: {
          trigger: '.edu-certs-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
