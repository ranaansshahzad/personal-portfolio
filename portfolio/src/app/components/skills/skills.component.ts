import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // percentage (e.g., 90)
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {
  
  skillCategories: SkillCategory[] = [
    {
      title: 'Dynamics 365 & Power Platform',
      skills: [
        { name: 'Dynamics 365 CRM (Sales & Customer Service)', level: 95 },
        { name: 'Power Apps (Canvas & Model-Driven)', level: 95 },
        { name: 'Microsoft Power Automate', level: 95 },
        { name: 'Power Pages', level: 90 },
        { name: 'Dataverse (Entities, Security & Customization)', level: 92 },
        { name: 'Copilot Integration & AI Builder', level: 88 }
      ]
    },
    {
      title: 'Integrations, APIs & Databases',
      skills: [
        { name: 'Microsoft SQL Server', level: 88 },
        { name: 'Graph API & REST Web Services', level: 86 },
        { name: 'Custom Components (PCF)', level: 80 },
        { name: 'SharePoint Document Library & Sites', level: 92 },
        { name: 'ShareGate Migration', level: 82 }
      ]
    },
    {
      title: 'Management & Cloud Security',
      skills: [
        { name: 'Project Management & Agile', level: 85 },
        { name: 'Sales Pipeline Optimization', level: 84 },
        { name: 'Information Security (Visionet Modules)', level: 90 },
        { name: 'Cyber Threat Modeling (M365 Cloud)', level: 85 }
      ]
    }
  ];

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  private initScrollAnimations() {
    // Reveal skill category cards
    gsap.fromTo('.category-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate progress bars from 0 to target width
    gsap.fromTo('.progress-fill',
      { width: '0%' },
      {
        width: (index, target) => target.getAttribute('data-level') + '%',
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}
