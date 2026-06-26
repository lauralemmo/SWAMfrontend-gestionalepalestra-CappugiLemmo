import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAthlete } from './home-athlete';

describe('HomeAthlete', () => {
  let component: HomeAthlete;
  let fixture: ComponentFixture<HomeAthlete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAthlete],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAthlete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
