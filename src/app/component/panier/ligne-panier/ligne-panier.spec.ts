import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignePanier } from './ligne-panier';

describe('LignePanier', () => {
  let component: LignePanier;
  let fixture: ComponentFixture<LignePanier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignePanier]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignePanier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
