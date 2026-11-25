import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomebrewSubspeciesListingComponent } from './homebrew-subspecies-listing.component';

describe('HomebrewSubspeciesListingComponent', () => {
  let component: HomebrewSubspeciesListingComponent;
  let fixture: ComponentFixture<HomebrewSubspeciesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebrewSubspeciesListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomebrewSubspeciesListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
