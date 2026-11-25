import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomebrewSpeciesListingComponent } from './homebrew-species-listing.component';

describe('HomebrewSpeciesListingComponent', () => {
  let component: HomebrewSpeciesListingComponent;
  let fixture: ComponentFixture<HomebrewSpeciesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebrewSpeciesListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomebrewSpeciesListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
