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
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    QrScannerComponent,
    JsonPipe,
    CapitalizePipe,
    NgFor,
    NgIf,
  ],
})
export class FormularioEmpleadoComponent implements OnInit {
  formRegistrar!: FormGroup;
  tiposEmpleados: string[] = [];
  procesando: boolean = false;

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
  get tipo() {
    return this.formRegistrar.get('tipo') as FormControl;
  }
  get correo() {
    return this.formRegistrar.get('correo') as FormControl;
  }
  get clave() {
    return this.formRegistrar.get('clave') as FormControl;
  }

  constructor(private empleadoService: EmpleadoService) {}

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
      tipo: new FormControl('', [Validators.required]),
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
    empleado.setTipo(this.tipo.value);
    empleado.setCorreo(this.correo.value);
    empleado.setClave(this.clave.value);
    return empleado;
  }

  public ngOnInit() {
    this.tiposEmpleados = Empleado.TIPOS;
    this.crearFormGroup();
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Empleado',
        promptLabelPhoto: 'Buscar foto local',
        promptLabelPicture: 'Tomar foto',
        quality: 75, // No subir demasiado este valor, relentiza el celular, almenos el mio.
        allowEditing: false,
        resultType: CameraResultType.Uri, // Usar Uri, es lo optimo, para luego hacer fetch al Uri y transformarlo a blob
      });
      if (image.webPath === undefined) {
        throw new Error('No se pudo recuperar la imagen de Camera.getPhoto()');
      }

      const swalertResult = await Swalert.modalCargarFoto();
      if (swalertResult.isConfirmed) {
        this.foto.setValue(image.webPath);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
  public recibirDataDniCuilQR($event: string) {
    this.nombre.setValue($event);
  }

  public async registrar() {
    try {
      this.procesando = true;

      const empleado = await this.empleadoService.alta(this.getEmpleado());
      console.log(empleado);

      await Swalert.toastSuccess('Alta realizada exitosamente');
    } catch (e: any) {
      console.log(e.message);
    } finally {
      this.procesando = false;
    }
  }
  public limpiar() {
    this.formRegistrar.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.cuil.setValue(0);
    this.foto.setValue(undefined);
    this.tipo.setValue('');
    this.correo.setValue('');
    this.clave.setValue('');
  }
}
