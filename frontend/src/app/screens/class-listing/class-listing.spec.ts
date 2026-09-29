import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassListing } from './class-listing';

describe('ClassListing', () => {
  let component: ClassListing;
  let fixture: ComponentFixture<ClassListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassListing],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
