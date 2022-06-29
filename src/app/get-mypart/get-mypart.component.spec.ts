import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMypartComponent } from './get-mypart.component';

describe('GetMypartComponent', () => {
  let component: GetMypartComponent;
  let fixture: ComponentFixture<GetMypartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMypartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMypartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
