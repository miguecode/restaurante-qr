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
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    ReactiveFormsModule,
    CommonModule,
    QrScannerComponent,
    CapitalizePipe,
    JsonPipe,
  ],
})
export class FormularioClienteComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() cliente: Cliente | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formRegistrar!: FormGroup;
  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  fotoBlob: any = undefined;
  procesando: boolean = false;

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

  constructor(private clienteService: ClienteService) {}

  private crearFormGroup() {
    if (this.modoAlta) {
      this.formAlta = new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        apellido: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        dni: new FormControl(0, [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
        foto: new FormControl(undefined, [Validators.required]),
        correo: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.required,
        ]),
        clave: new FormControl('', [
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
        foto: new FormControl(undefined),
        correo: new FormControl('', [Validators.required, Validators.email]),
      });
    }

    if (this.cliente !== undefined) {
      this.id.setValue(this.cliente.id);
      this.nombre.setValue(this.cliente.nombre);
      this.apellido.setValue(this.cliente.apellido);
      this.dni.setValue(this.cliente.dni);
      this.correo.setValue(this.cliente.correo);
    }
  }

  public ngOnInit() {
    this.crearFormGroup();
  }

  private async alta() {
    await this.clienteService.alta(this.getCliente());
    await Swalert.toastSuccess('Alta realizada exitosamente');
  }
  private async baja() {
    await this.clienteService.bajaLogica(this.getCliente());
    await Swalert.toastSuccess('Baja realizada exitosamente');
  }
  private async modificar() {
    await this.clienteService.modificar(this.getCliente());
    await Swalert.toastSuccess('Modificacion realizada exitosamente');
  }

  private getCliente() {
    let cliente = new Cliente();
    if ((this.modoModificar || this.modoBaja) && this.cliente !== undefined) {
      cliente = this.cliente;
    }
    if (this.modoModificar || this.modoBaja) {
      cliente.setId(this.id.value);
    }
    cliente.setNombre(this.nombre.value);
    cliente.setApellido(this.apellido.value);
    cliente.setDni(this.dni.value);
    if (this.foto.value !== null) {
      cliente.setFile(this.foto.value);
    } else {
      throw new Error('errorfoto');
    }

    console.log(this.foto.value);
    if ((this.modoModificar || this.modoBaja) && this.cliente !== undefined) {
      cliente.setUrlFoto(this.cliente.foto);
      console.log(this.cliente.foto);
    }
    cliente.setCorreo(this.correo.value);
    if (this.modoAlta) {
      cliente.setClave(this.clave.value);
    }
    return cliente;
  }

  public async accion() {
    try {
      this.procesando = true;

      if (this.modoAlta) {
        if (this.formAlta.invalid) {
          this.formAlta.markAllAsTouched();
          console.log('invalid form');
          return;
        } else {
          await this.alta();
        }
      } else if (this.modoModificar) {
        if (this.formModificar.invalid) {
          this.formModificar.markAllAsTouched();
          console.log('invalid form');
          return;
        } else {
          await this.modificar();
        }
      } else if (this.modoBaja) {
        await this.baja();
      }

      setTimeout(() => {
        this.handlerTerminado.emit();
      }, 1500);
    } catch (e: any) {
      console.log(e.message);

      switch (e.code) {
        case 'auth/email-already-in-use':
          e.message = 'El email esta en uso';
          break;
        case 'auth/invalid-email':
          e.message = 'Introduzca un email valido';
          break;
        case 'auth/missing-password':
          e.message = 'Introduzca una contraseña por favor';
          break;
        default:
          e.message = 'Por favor ingrese bien sus datos';
          break;
      }
      await Swalert.toastError(e.message);
    } finally {
      this.procesando = false;
    }
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Cliente',
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
        console.log(image.webPath);
        this.foto.setValue(image.webPath);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  public recibirDataDniCuilQR($event: string) {
    const source = TraductorQr.DniEjemplarA($event);
    this.dni.setValue(source.dni);
    this.dni.markAsDirty();
  }

  public limpiar() {
    this.formRegistrar.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.foto.setValue(undefined);
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

  isValidField(field: string): boolean | null {
    let control = null;
    if (this.modoAlta) {
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

    return (control?.errors && control?.touched) || null;
  }

  getFieldError(field: string): string | null {
    let control = null;
    if (this.modoAlta) {
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

    if (!control || !control.errors) return null;

    const errors = control.errors;
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errors['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errors['max'].max}.`;
        case 'pattern':
          return 'Formato inválido';
        case 'email':
          return 'Email invalido';
      }
    }
    return null;
  }
}
