import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements AfterViewInit {
  experiences: Experience[] = [
    {
      role: 'Dynamics 365 - CRM Technical Consultant',
      company: 'Tech Implement',
      period: 'Mar 2025 - Present',
      description: [
        'Design and develop custom Dynamics 365 CRM solutions tailored to organizational business processes.',
        'Customize entities, forms, views, security roles, and business rules within Dataverse.',
        'Perform data migration and synchronization pipelines between Dynamics 365 CRM and Microsoft SQL Server databases.'
      ],
      tags: ['Dynamics 365 CRM', 'Dataverse', 'Power Apps', 'Power Automate', 'SQL Server', 'REST APIs']
    },
    {
      role: 'Dynamics 365 CRM & Microsoft Power Platform Consultant',
      company: 'AHF Business Solution Ltd',
      period: 'Oct 2023 - Jan 2026',
      description: [
        'Designed custom CRM systems and customized Dynamics modules for healthcare client pipelines (AL HUB, AL HRM).',
        'Implemented custom integrations with third-party systems using Graph API and REST-based services.',
        'Collaborated with solution architects to deliver scalable low-code apps and automated business approval processes.'
      ],
      tags: ['Dynamics 365 CRM', 'Power Apps', 'Power Automate', 'Dataverse', 'SharePoint Online', 'ShareGate']
    },
    {
      role: 'Junior Microsoft Power Platform Developer',
      company: 'SoftShifters Private Limited',
      period: 'Mar 2023 - Oct 2023',
      description: [
        'Built canvas and model-driven applications for event management (Dubai World Trade Center Organizer Portal), Outgoing Request Management, and petty cash expense tracking.',
        'Developed secure Power Pages portals for exhibitors and organizational departments.',
        'Automated multi-stage approval processes using Power Automate, SharePoint Online, and Microsoft Teams.'
      ],
      tags: ['Power Apps', 'Power Pages', 'Power Automate', 'SharePoint Online', 'SharePoint Document Library']
    },
    {
      role: 'Trainee Microsoft Power Platform Developer',
      company: 'Systems Limited',
      period: 'Sep 2022 - Mar 2023',
      description: [
        'Developed workforce capacity planning and resource forecasting solutions for Majid Al Futtaim.',
        'Built automated approval workflows, notifications, and scheduled alerts in Power Automate.',
        'Customized model-driven entities, canvas interfaces, and security permissions.'
      ],
      tags: ['Canvas App', 'Model-Driven Apps', 'Power BI', 'Dataverse', 'Power Automate']
    },
    {
      role: 'SharePoint Administrator Developer',
      company: 'WilCode Development',
      period: 'Feb 2021 - Sep 2022',
      description: [
        'Managed SharePoint Online environments, ensuring document management system stability, availability, and user access permissions.',
        'Developed custom SharePoint designer workflows and automated forms to streamline internal operations.',
        'Supported business units with collaboration platform enhancements and document library migrations.'
      ],
      tags: ['SharePoint Online', 'SharePoint Workflows', 'SharePoint Sites', 'Document Library', 'Administration']
    }
  ];

  ngAfterViewInit() {
    this.initTimelineAnimations();
  }

  private initTimelineAnimations() {
    // 1. Draw the timeline line on scroll
    gsap.fromTo('.timeline-progress-line',
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-main-container',
          start: 'top 20%',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );

    // 2. Animate cards and markers entrance
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      // Card entrance (left/right fade)
      const card = item.querySelector('.timeline-card');
      const marker = item.querySelector('.timeline-marker');
      
      const isEven = index % 2 === 0;
      
      gsap.fromTo(card,
        { 
          opacity: 0, 
          x: isEven ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(marker,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }
}
