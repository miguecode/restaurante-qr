import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeccionConfirmarReservaComponent } from './seccion-confirmar-reserva.component';

describe('SeccionConfirmarReservaComponent', () => {
  let component: SeccionConfirmarReservaComponent;
  let fixture: ComponentFixture<SeccionConfirmarReservaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionConfirmarReservaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionConfirmarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
