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
import { Supervisor } from 'src/app/classes/supervisor';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-supervisor',
  templateUrl: './formulario-supervisor.component.html',
  styleUrls: ['./formulario-supervisor.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    FormsModule,
    ReactiveFormsModule,
    QrScannerComponent,
    JsonPipe,
    CapitalizePipe,
    NgFor,
    NgIf,
  ],
})
export class FormularioSupervisorComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() supervisor: Supervisor | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  Supervisors: string[] = [];
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

  constructor(private supervisorService: SupervisorService) {}

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
        foto: new FormControl(undefined),
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
        foto: new FormControl(undefined, [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
      });
    }

    if (this.supervisor !== undefined) {
      this.id.setValue(this.supervisor.id);
      this.nombre.setValue(this.supervisor.nombre);
      this.apellido.setValue(this.supervisor.apellido);
      this.dni.setValue(this.supervisor.dni);
      this.cuil.setValue(this.supervisor.cuil);
      this.correo.setValue(this.supervisor.correo);
    }
  }
  private getSupervisor() {
    let supervisor = new Supervisor();
    if (
      (this.modoModificar || this.modoBaja) &&
      this.supervisor !== undefined
    ) {
      supervisor = this.supervisor;
    }
    if (this.modoModificar || this.modoBaja) {
      supervisor.setId(this.id.value);
    }
    supervisor.setNombre(this.nombre.value);
    supervisor.setApellido(this.apellido.value);
    supervisor.setDni(this.dni.value);
    supervisor.setCuil(this.cuil.value);
    supervisor.setFile(this.foto.value);
    if (
      (this.modoModificar || this.modoBaja) &&
      this.supervisor !== undefined
    ) {
      supervisor.setUrlFoto(this.supervisor.foto);
    }
    supervisor.setCorreo(this.correo.value);
    if (this.modoAlta) {
      supervisor.setClave(this.clave.value);
    }
    return supervisor;
  }
  private async alta() {
    await this.supervisorService.alta(this.getSupervisor());
    await Swalert.toastSuccess('Alta realizada exitosamente');
  }
  private async baja() {
    await this.supervisorService.bajaLogica(this.getSupervisor());
    await Swalert.toastSuccess('Baja realizada exitosamente');
  }
  private async modificar() {
    await this.supervisorService.modificar(this.getSupervisor());
    await Swalert.toastSuccess('Modificacion realizada exitosamente');
  }

  public ngOnInit() {
    this.crearFormGroup();
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Supervisor',
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
  public recibirDataDniCuilQR($event: string) {
    this.nombre.setValue($event);
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
