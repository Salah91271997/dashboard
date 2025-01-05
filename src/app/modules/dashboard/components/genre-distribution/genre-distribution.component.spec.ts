import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDistributionComponent } from './genre-distribution.component';

describe('GenreDistributionComponent', () => {
  let component: GenreDistributionComponent;
  let fixture: ComponentFixture<GenreDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenreDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
