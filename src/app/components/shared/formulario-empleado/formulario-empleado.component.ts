import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class FormularioEmpleadoComponent implements OnInit {
  formRegistrar!: FormGroup;

  get nombre() {
    return this.formRegistrar.get('nombre') as FormControl;
  }
  get apellido() {
    return this.formRegistrar.get('apellido') as FormControl;
  }
  get dni() {
    return this.formRegistrar.get('dni') as FormControl;
  }
  get cuil() {
    return this.formRegistrar.get('cuil') as FormControl;
  }
  get foto() {
    return this.formRegistrar.get('foto') as FormControl;
  }
  get rol() {
    return this.formRegistrar.get('rol') as FormControl;
  }
  get correo() {
    return this.formRegistrar.get('correo') as FormControl;
  }
  get clave() {
    return this.formRegistrar.get('clave') as FormControl;
  }

  constructor() {
    this.crearFormGroup();
  }

  ngOnInit() {
    console.log(''); // Solo para que tire error
  }

  limpiar() {
    this.formRegistrar.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.cuil.setValue(0);
    this.foto.setValue(undefined);
    this.rol.setValue('');
    this.correo.setValue('');
    this.clave.setValue('');
  }

  registrar() {
    alert('accion registrar');
  }

  private crearFormGroup() {
    this.formRegistrar = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl(0, [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999),
      ]),
      cuil: new FormControl(0, [
        Validators.required,
        Validators.min(10000000000),
        Validators.max(99999999999),
      ]),
      foto: new FormControl(undefined, [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(30),
      ]),
    });
  }
}
