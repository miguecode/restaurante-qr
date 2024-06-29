import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeccionClientesPendientesAprobacionComponent } from './seccion-clientes-pendientes-aprobacion.component';

describe('SeccionClientesPendientesAprobacionComponent', () => {
  let component: SeccionClientesPendientesAprobacionComponent;
  let fixture: ComponentFixture<SeccionClientesPendientesAprobacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionClientesPendientesAprobacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeccionClientesPendientesAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
