import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionSalaComponent } from './creacion-sala.component';

describe('CreacionSalaComponent', () => {
  let component: CreacionSalaComponent;
  let fixture: ComponentFixture<CreacionSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
