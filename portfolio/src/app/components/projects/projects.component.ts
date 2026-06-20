import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  role: string;
  description: string;
  platform: string;
  tech: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'InfoDash – Dynamics 365 Sales CRM',
      role: 'Technical Consultant',
      description: 'Developed and customized a Dynamics 365 Sales CRM solution to automate revenue calculations and improve sales pipeline management. Configured term conversion formulas, error handling, and cloud flows.',
      platform: 'Dynamics 365 Sales',
      tech: ['Dynamics 365 Sales', 'Power Apps (Model-Driven)', 'Dataverse', 'Power Automate']
    },
    {
      title: 'NZF – National Zakat Foundation CRM',
      role: 'Dynamics Consultant',
      description: 'Built a Model-Driven app to manage Zakat donations, tracking donor records and CRM workflow pipelines. Customized Sales, Marketing, and Customer Service modules for charity tracking.',
      platform: 'Power Apps & Dynamics 365',
      tech: ['Power Apps', 'Dataverse', 'Dynamics 365 CRM', 'Power Automate']
    },
    {
      title: 'Assisted Lives – Healthcare Solutions',
      role: 'Power Platform Developer',
      description: 'Built healthcare management, HR automation (AL HUB, AL HRM onboarding automation), and billing tracking solutions. Handled document migrations from SharePoint Online using ShareGate.',
      platform: 'Healthcare ERP Systems',
      tech: ['Power Apps', 'SharePoint Online', 'Power Automate', 'Dataverse', 'ShareGate']
    },
    {
      title: 'Dubai World Trade Center – Event Portals',
      role: 'Low-Code Developer',
      description: 'Developed an organizer registration portal, petty cash, and parking allocation apps. Built custom Power Pages portal sites to manage exhibitor documents and automated Outgoing Request validations.',
      platform: 'Event Management Platforms',
      tech: ['Power Apps', 'Power Pages', 'SharePoint Online', 'Power Automate']
    },
    {
      title: 'Tengizchevroil – Oil Well Management',
      role: 'Developer',
      description: 'Created an operational monitoring system to track oil well performance, maintenance alerts, and compliance scheduling, integrating SQL server data stores and Power Automate reminders.',
      platform: 'Industrial Operations',
      tech: ['Power Apps', 'SQL Server', 'Power Automate', 'SharePoint']
    },
    {
      title: 'Majid Al Futtaim – Resource Planning',
      role: 'Developer & Analyst',
      description: 'Developed a resource capacity planning and workload distribution dashboard to forecast project allocations using Canvas and Model-driven Power Apps.',
      platform: 'Workforce Planning',
      tech: ['Model-Driven Apps', 'Canvas Apps', 'Dataverse', 'Power BI']
    }
  ];

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    // Staggered card fade-in
    gsap.fromTo('.project-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 3D Card tilt handler
  onMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    
    // Relative mouse positions
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Centers
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotations (max 8 degrees for premium, subtle feel)
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;
    
    // Update style directly for high-performance rendering
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 35px rgba(0, 120, 212, 0.15), var(--shadow-glow)`;
    
    // Subtle sheen shift (background gradient offset)
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
  }

  onMouseLeave(card: HTMLElement) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `var(--shadow-md)`;
    card.style.setProperty('--glow-x', `50%`);
    card.style.setProperty('--glow-y', `50%`);
  }
}
