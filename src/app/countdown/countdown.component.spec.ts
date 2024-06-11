import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { FormsModule } from '@angular/forms';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CountdownComponent] 
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.clear(); 
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with the default state', () => {
    expect(component.eventTitle).toBeNull();
    expect(component.eventDate).toBeNull();
    expect(component.timeRemaining).toBe('Enter Event Date');
  });
  it('should update the time remaining when the event date changes', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); 
    component.eventDate = futureDate;
    component.updateTimeRemaining();
    fixture.detectChanges();
    expect(component.timeRemaining).toContain('1 days');
  });
  it('should save the event title to localStorage', () => {
    const title = 'Test Event';
    component.onEventTitleChange({ target: { value: title } });
    expect(localStorage.getItem('eventTitle')).toBe(title);
  });
  it('should save the event date to localStorage', () => {
    const date = new Date();
    component.onEventDateChange({ target: { value: date.toISOString().split('T')[0] } });
    const storedDate = new Date(localStorage.getItem('eventDate')!);
    expect(storedDate.toISOString().split('T')[0]).toBe(date.toISOString().split('T')[0]);
  });
});
