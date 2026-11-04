import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterLevelComponent } from './character-level.component';

describe('CharacterLevelComponent', () => {
  let component: CharacterLevelComponent;
  let fixture: ComponentFixture<CharacterLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterLevelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
