import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriCard } from './favori-card';

describe('FavoriCard', () => {
  let component: FavoriCard;
  let fixture: ComponentFixture<FavoriCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
