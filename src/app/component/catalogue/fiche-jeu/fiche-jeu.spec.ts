import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheJeu } from './fiche-jeu';

describe('FicheJeu', () => {
  let component: FicheJeu;
  let fixture: ComponentFixture<FicheJeu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheJeu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheJeu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
