import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWrapperComponent } from './ngx-wrapper.component';

describe('NgxWrapperComponent', () => {
  let component: NgxWrapperComponent;
  let fixture: ComponentFixture<NgxWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
