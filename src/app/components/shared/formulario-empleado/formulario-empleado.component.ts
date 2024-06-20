import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Empleado } from 'src/app/classes/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import Swal from 'sweetalert2';

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
  get correo() {
    return this.formRegistrar.get('correo') as FormControl;
  }
  get clave() {
    return this.formRegistrar.get('clave') as FormControl;
  }

  constructor(private empleadoService: EmpleadoService) {
    this.crearFormGroup();
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
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(30),
      ]),
    });
  }
  private getEmpleado() {
    let empleado = new Empleado();
    empleado.setNombre(this.nombre.value);
    empleado.setApellido(this.apellido.value);
    empleado.setDni(this.dni.value);
    empleado.setCuil(this.cuil.value);
    empleado.setFile(this.foto.value);
    empleado.setCorreo(this.correo.value);
    empleado.setClave(this.clave.value);
    return empleado;
  }

  public ngOnInit() {
    console.log(''); // Solo para que tire error
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Empleado',
        promptLabelPhoto: 'Buscar foto local',
        promptLabelPicture: 'Tomar foto',
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      if (image.base64String === undefined) {
        throw new Error('No se pudo recuperar la imagen de Camera.getPhoto()');
      }

      const mimeType = image.format === 'jpeg' ? 'image/jpeg' : 'image/png';
      const swalertResult = await Swalert.modalCargarFoto();
      if (swalertResult.isConfirmed) {
        this.foto.setValue({ base64String: image.base64String, mimeType });
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      console.log(this.foto.value);
    }
  }

  public async registrar() {
    try {
      const empleado = this.getEmpleado();
      empleado.file = this.foto.value; // Pasa todo el objeto foto
      await this.empleadoService.alta(empleado);
      console.log(empleado);
      await Swalert.toastSuccess('Registrado exitosamente');
      this.limpiar();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  public limpiar() {
    this.formRegistrar.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.cuil.setValue(0);
    this.foto.setValue(undefined);
    this.correo.setValue('');
    this.clave.setValue('');
  }
}
