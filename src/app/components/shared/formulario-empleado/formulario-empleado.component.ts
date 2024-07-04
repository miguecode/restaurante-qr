import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Empleado } from 'src/app/classes/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { IonContent } from '@ionic/angular/standalone';
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';
import { BarcodeScanningService } from 'src/app/services/utils/barcode-scanning.service';

@Component({
  selector: 'app-formulario-empleado',
  templateUrl: './formulario-empleado.component.html',
  styleUrls: ['./formulario-empleado.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    CapitalizePipe,
    NgFor,
    NgIf,
  ],
})
export class FormularioEmpleadoComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() empleado: Empleado | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  tiposEmpleados: string[] = [];
  procesando: boolean = false;

  fotoBlob: any = undefined;

  get id() {
    if (this.modoModificar) {
      return this.formModificar.get('id') as FormControl;
    }
    return this.formBaja.get('id') as FormControl;
  }
  get nombre() {
    if (this.modoAlta) {
      return this.formAlta.get('nombre') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('nombre') as FormControl;
    }
    return this.formBaja.get('nombre') as FormControl;
  }
  get apellido() {
    if (this.modoAlta) {
      return this.formAlta.get('apellido') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('apellido') as FormControl;
    }
    return this.formBaja.get('apellido') as FormControl;
  }
  get dni() {
    if (this.modoAlta) {
      return this.formAlta.get('dni') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('dni') as FormControl;
    }
    return this.formBaja.get('dni') as FormControl;
  }
  get cuil() {
    if (this.modoAlta) {
      return this.formAlta.get('cuil') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('cuil') as FormControl;
    }
    return this.formBaja.get('cuil') as FormControl;
  }
  get foto() {
    if (this.modoAlta) {
      return this.formAlta.get('foto') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('foto') as FormControl;
    }
    return this.formBaja.get('foto') as FormControl;
  }
  get tipo() {
    if (this.modoAlta) {
      return this.formAlta.get('tipo') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('tipo') as FormControl;
    }
    return this.formBaja.get('tipo') as FormControl;
  }
  get correo() {
    if (this.modoAlta) {
      return this.formAlta.get('correo') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('correo') as FormControl;
    }
    return this.formBaja.get('correo') as FormControl;
  }
  get clave() {
    if (this.modoAlta) {
      return this.formAlta.get('clave') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('clave') as FormControl;
    }
    return this.formBaja.get('clave') as FormControl;
  }

  constructor(
    private empleadoService: EmpleadoService,
    private barcodeScanningService: BarcodeScanningService
  ) {}

  private crearFormGroup() {
    if (this.modoAlta) {
      this.formAlta = new FormGroup({
        nombre: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        apellido: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        dni: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
        cuil: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(10),
          Validators.maxLength(12),
        ]),
        foto: new FormControl(undefined, [Validators.required]),
        tipo: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        clave: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else if (this.modoModificar) {
      this.formModificar = new FormGroup({
        id: new FormControl(0, []),
        nombre: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        apellido: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        dni: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
        cuil: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(10),
          Validators.maxLength(12),
        ]),
        foto: new FormControl(undefined), // Le saqué el 'required' para evitar un error al modificar
        tipo: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
      });
    } else if (this.modoBaja) {
      this.formBaja = new FormGroup({
        id: new FormControl(0, []),
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
        tipo: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
      });
    }

    if (this.empleado !== undefined) {
      this.id.setValue(this.empleado.id);
      this.nombre.setValue(this.empleado.nombre);
      this.apellido.setValue(this.empleado.apellido);
      this.dni.setValue(this.empleado.dni);
      this.cuil.setValue(this.empleado.cuil);
      this.tipo.setValue(this.empleado.tipo);
      this.correo.setValue(this.empleado.correo);
    }
  }
  private getEmpleado() {
    let empleado = new Empleado();
    if ((this.modoModificar || this.modoBaja) && this.empleado !== undefined) {
      empleado = this.empleado;
    }
    if (this.modoModificar || this.modoBaja) {
      empleado.setId(this.id.value);
    }
    empleado.setNombre(this.nombre.value);
    empleado.setApellido(this.apellido.value);
    empleado.setDni(this.dni.value);
    empleado.setCuil(this.cuil.value);
    empleado.setFile(this.foto.value);
    if ((this.modoModificar || this.modoBaja) && this.empleado !== undefined) {
      empleado.setUrlFoto(this.empleado.foto);
    }
    empleado.setTipo(this.tipo.value);
    empleado.setCorreo(this.correo.value);
    if (this.modoAlta) {
      empleado.setClave(this.clave.value);
    }
    return empleado;
  }
  private async alta() {
    await this.empleadoService.alta(this.getEmpleado());
    await Swalert.toastSuccess('Alta realizada exitosamente');
  }
  private async baja() {
    await this.empleadoService.bajaLogica(this.getEmpleado());
    await Swalert.toastSuccess('Baja realizada exitosamente');
  }
  private async modificar() {
    await this.empleadoService.modificar(this.getEmpleado());
    await Swalert.toastSuccess('Modificacion realizada exitosamente');
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
        const source = await fetch(image.webPath);
        const blob = await source.blob();
        this.fotoBlob = URL.createObjectURL(blob);
        this.foto.setValue(image.webPath);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
<<<<<<< HEAD

  public recibirDataDniCuilQR($event: string) {
    const source = TraductorQr.DniEjemplarA($event);
=======
  public async escanearDniCuil() {
    const dataQr = await this.barcodeScanningService.escanearQr();
    const source = TraductorQr.DniEjemplarA(dataQr);
>>>>>>> master
    this.dni.setValue(source.dni);
    this.cuil.setValue(source.cuil);
    this.dni.markAsDirty();
    this.cuil.markAsDirty();
  }

  public async accion() {
    try {
      this.procesando = true;

      if (this.modoAlta) {
        await this.alta();
      } else if (this.modoModificar) {
        await this.modificar();
      } else if (this.modoBaja) {
        await this.baja();
      }

      setTimeout(() => {
        this.handlerTerminado.emit();
      }, 1500);
    } catch (e: any) {
      console.log(e.message);
      await Swalert.toastError(e.message);
    } finally {
      this.procesando = false;
    }
  }

  public limpiar() {
    this.formAlta.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.cuil.setValue(0);
    this.foto.setValue(undefined);
    this.fotoBlob = undefined;
    this.tipo.setValue('');
    this.correo.setValue('');
    this.clave.setValue('');
  }

  private validarPalabra(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid =
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'’-]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ'’-]+)*$/.test(
          control.value
        );
      return valid ? null : { invalidName: true };
    };
  }
}
