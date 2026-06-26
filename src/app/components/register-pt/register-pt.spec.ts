import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPt } from './register-pt';

describe('RegisterPt', () => {
  let component: RegisterPt;
  let fixture: ComponentFixture<RegisterPt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPt],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
