import { NgFor, NgIf } from '@angular/common';
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
import { Camera, CameraResultType } from '@capacitor/camera';
import { Duenio } from 'src/app/classes/duenio';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { DuenioService } from 'src/app/services/duenio.service';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-duenio',
  templateUrl: './formulario-duenio.component.html',
  styleUrls: ['./formulario-duenio.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CapitalizePipe,
  ],
})
export class FormularioDuenioComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() duenio: Duenio | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  procesando: boolean = false;
  fotoBlob: any;

  get id() {
    if (this.modoModificar) {
      return this.formModificar.get('id') as FormControl;
    } else return this.formBaja.get('id') as FormControl;
  }

  get nombre() {
    if (this.modoAlta) {
      return this.formAlta.get('nombre') as FormControl;
    } else if (this.modoModificar) {
      return this.formAlta.get('nombre') as FormControl;
    } else {
      return this.formBaja.get('nombre') as FormControl;
    }
  }
  get apellido() {
    if (this.modoAlta) {
      return this.formAlta.get('apellido') as FormControl;
    } else if (this.modoModificar) {
      return this.formAlta.get('apellido') as FormControl;
    } else {
      return this.formBaja.get('apellido') as FormControl;
    }
  }
  get dni() {
    if (this.modoAlta) {
      return this.formAlta.get('dni') as FormControl;
    } else if (this.modoModificar) {
      return this.formAlta.get('dni') as FormControl;
    } else {
      return this.formBaja.get('dni') as FormControl;
    }
  }
  get cuil() {
    if (this.modoAlta) {
      return this.formAlta.get('cuil') as FormControl;
    } else if (this.modoModificar) {
      return this.formAlta.get('cuil') as FormControl;
    } else {
      return this.formBaja.get('cuil') as FormControl;
    }
  }
  get correo() {
    if (this.modoAlta) {
      return this.formAlta.get('correo') as FormControl;
    } else if (this.modoModificar) {
      return this.formAlta.get('correo') as FormControl;
    } else {
      return this.formBaja.get('correo') as FormControl;
    }
  }
  get foto() {
    if (this.modoAlta) {
      return this.formAlta.get('foto') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('foto') as FormControl;
    }
    return this.formBaja.get('foto') as FormControl;
  }

  constructor(private duenioService: DuenioService) {}

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
        correo: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.required,
        ]),
        clave: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else if (this.modoBaja) {
      this.formBaja = new FormGroup({
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
        foto: new FormControl(undefined, [Validators.required]),
        correo: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.required,
        ]),
      });

      if (this.duenio !== undefined) {
        this.id.setValue(this.duenio.id);
        this.nombre.setValue(this.duenio.nombre);
        this.apellido.setValue(this.duenio.apellido);
        this.dni.setValue(this.duenio.dni);
        this.cuil.setValue(this.duenio.cuil);
        this.correo.setValue(this.duenio.correo);
      }
    } else if (this.modoModificar) {
      this.formModificar = new FormGroup({
        id: new FormControl(0, []),
        cantidadMaxima: new FormControl(0, [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99999999),
        ]),
        tipo: new FormControl('', [Validators.required]),
        foto: new FormControl(undefined, [Validators.required]),
      });

      if (this.duenio !== undefined) {
        this.id.setValue(this.duenio.id);
        this.nombre.setValue(this.duenio.nombre);
        this.apellido.setValue(this.duenio.apellido);
        this.dni.setValue(this.duenio.dni);
        this.cuil.setValue(this.duenio.cuil);
        this.correo.setValue(this.duenio.correo);
      }
    }
  }
  private getDuenio() {
    let duenio = new Duenio();
    if (this.modoModificar || this.modoBaja) {
      duenio.setId(this.id.value);
    }
    duenio.setNombre(this.nombre.value);
    duenio.setApellido(this.apellido.value);
    duenio.setDni(this.dni.value);
    duenio.setCuil(this.cuil.value);
    duenio.setCorreo(this.correo.value);
    duenio.setFile(this.foto.value);
    return duenio;
  }
  private async alta() {
    const duenio = await this.duenioService.alta(this.getDuenio());
    console.log(duenio);
    Swalert.toastSuccess('Alta realizada exitosamente');
  }
  private async modificar() {
    const duenio = await this.duenioService.modificar(this.getDuenio());
    console.log(duenio);
    Swalert.toastSuccess('Modificación realizada exitosamente');
  }
  private async baja() {
    const duenio = await this.duenioService.baja(this.getDuenio());
    console.log(duenio);
    Swalert.toastSuccess('Baja realizada exitosamente');
  }

  public ngOnInit() {
    this.crearFormGroup();
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Duenio',
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
      Swalert.toastError(e.message);
    }
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
      } else {
        throw new Error(
          'Es necesario especificar por Input si el formulario es para Alta o Baja o Modificación'
        );
      }

      setTimeout(() => {
        this.handlerTerminado.emit();
      }, 1500);
    } catch (e: any) {
      console.log(e.message);
      Swalert.toastError(e.message);
    } finally {
      this.procesando = false;
    }
  }

  public limpiar() {
    this.formAlta.reset();
    this.formModificar.reset();
    this.formBaja.reset();
    this.nombre.setValue(undefined);
    this.apellido.setValue(undefined);
    this.dni.setValue(undefined);
    this.cuil.setValue(undefined);
    this.correo.setValue(undefined);
    this.foto.setValue(undefined);
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
