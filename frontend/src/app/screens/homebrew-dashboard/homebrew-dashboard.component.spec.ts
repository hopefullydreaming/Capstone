import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomebrewDashboardComponent } from './homebrew-dashboard.component';

describe('HomebrewDashboardComponent', () => {
  let component: HomebrewDashboardComponent;
  let fixture: ComponentFixture<HomebrewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebrewDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomebrewDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
