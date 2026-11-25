import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomebrewClassListingComponent } from './homebrew-class-listing.component';

describe('HomebrewClassListingComponent', () => {
  let component: HomebrewClassListingComponent;
  let fixture: ComponentFixture<HomebrewClassListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebrewClassListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomebrewClassListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
