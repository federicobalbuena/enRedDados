import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasRespuestasComponent } from './preguntas-respuestas.component';

describe('PreguntasRespuestasComponent', () => {
  let component: PreguntasRespuestasComponent;
  let fixture: ComponentFixture<PreguntasRespuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntasRespuestasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
