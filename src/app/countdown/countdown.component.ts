import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  eventTitle: string | null;
  eventDate: Date | null;
  timeRemaining: string = '';
  intervalId: any;

  constructor() {
    const savedTitle = localStorage.getItem('eventTitle');
    this.eventTitle = savedTitle ? savedTitle : null;
    const savedDate = localStorage.getItem('eventDate');
    this.eventDate = savedDate ? new Date(savedDate) : null;
    this.updateTimeRemaining();
  }

  ngOnInit(): void {
    this.updateTimeRemaining();
    this.intervalId = setInterval(() => this.updateTimeRemaining(), 1000);
    this.adjustFontSize();
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  updateTimeRemaining(): void {
    const now = new Date();
    if (!this.eventDate || isNaN(this.eventDate.getTime())) {
      this.timeRemaining = 'Enter Event Date';
      return;
    }
    const timeDiff = this.eventDate.getTime() - now.getTime();
    if (timeDiff <= 0) {
      this.timeRemaining = 'Event has passed';
      return;
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    this.timeRemaining = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
  onEventTitleChange(event: any): void {
    try {
      this.eventTitle = event.target.value || null;
      if (this.eventTitle) {
        localStorage.setItem('eventTitle', this.eventTitle);
      } else {
        localStorage.removeItem('eventTitle');
      }
      this.adjustFontSize(); 
    } catch (error) {
      console.error('Error saving event title', error);
    }
  }
  onEventDateChange(event: any): void {
    try {
      const newDate = new Date(event.target.value);
      if (!isNaN(newDate.getTime())) {
        this.eventDate = newDate;
        localStorage.setItem('eventDate', this.eventDate.toISOString());
        this.updateTimeRemaining();
      } else {
        this.eventDate = null;
        this.timeRemaining = 'Enter event date';
        localStorage.removeItem('eventDate');
      }
    } catch (error) {
      console.error('Error saving event date', error);
    }
  }
  clearEvent(): void {
    this.eventTitle = null;
    this.eventDate = null;
    this.timeRemaining = 'Enter event date';
    localStorage.removeItem('eventTitle');
    localStorage.removeItem('eventDate');
    this.adjustFontSize(); 
  }
  get displayTitle(): string {
    return this.eventTitle ? `Time to ${this.eventTitle}` : 'Enter Event Title';
  }
  @HostListener('window:resize')
  onWindowResize(): void {
    this.adjustFontSize(); 
  }
  private adjustFontSize(): void {
    const container = document.querySelector('.countdown-container');
    if (!container) return;
    const elements = container.querySelectorAll('h1, p');
    const maxFontSize = 8; 
    const minFontSize = 2; 
    elements.forEach(element => {
      let fontSize = maxFontSize;
      (element as HTMLElement).style.fontSize = `${fontSize}vw`;
      while ((element as HTMLElement).scrollWidth > container.clientWidth && fontSize > minFontSize) {
        fontSize -= 0.5;
        (element as HTMLElement).style.fontSize = `${fontSize}vw`;
      }
    });
  }
}
