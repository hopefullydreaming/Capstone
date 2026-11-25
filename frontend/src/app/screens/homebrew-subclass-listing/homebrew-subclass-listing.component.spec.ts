import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomebrewSubclassListingComponent } from './homebrew-subclass-listing.component';

describe('HomebrewSubclassListingComponent', () => {
  let component: HomebrewSubclassListingComponent;
  let fixture: ComponentFixture<HomebrewSubclassListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebrewSubclassListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomebrewSubclassListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
