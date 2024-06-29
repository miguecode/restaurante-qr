import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Cliente } from 'src/app/classes/cliente';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';
import { ClienteService } from 'src/app/services/cliente.service';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { confirmarClaveValidator } from 'src/app/classes/utils/claveValidator';

@Component({
  selector: 'app-formulario-registro-cliente',
  standalone: true,
  imports: [QrScannerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-registro-cliente.component.html',
  styleUrls: ['./formulario-registro-cliente.component.scss'],
})
export class FormularioRegistroClienteComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() cliente: Cliente | undefined = undefined;

  formRegistrar!: FormGroup;
  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  fotoBlob: any = undefined;
  procesando: boolean = false;

  get nombre() {
    return this.formAlta.get('nombre') as FormControl;
  }

  get apellido() {
    return this.formAlta.get('apellido') as FormControl;
  }

  get dni() {
    return this.formAlta.get('dni') as FormControl;
  }

  get foto() {
    return this.formAlta.get('foto') as FormControl;
  }

  get correo() {
    return this.formAlta.get('correo') as FormControl;
  }

  get clave() {
    return this.formAlta.get('clave') as FormControl;
  }

  get repetirClave() {
    return this.formAlta.get('repetirClave') as FormControl;
  }

  constructor(private clienteService: ClienteService, private router: Router) {}

  private crearFormGroup() {
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
      dni: new FormControl('', [
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
      repetirClave: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    }, confirmarClaveValidator());
  }

  public ngOnInit() {
    this.crearFormGroup();
  }

  private async alta() {
    await this.clienteService.alta(this.getCliente());
    await Swalert.toastSuccess('Alta realizada exitosamente');
  }

  private getCliente() {
    let cliente = new Cliente();
    cliente.setNombre(this.nombre.value);
    cliente.setApellido(this.apellido.value);
    cliente.setDni(this.dni.value);
    if (this.foto.value !== null) {
      cliente.setFile(this.foto.value);
    } else {
      throw new Error('errorfoto');
    }
    cliente.setCorreo(this.correo.value);
    cliente.setClave(this.clave.value);

    return cliente;
  }

  public async accion() {
    try {
      this.procesando = true;

      if (this.formAlta.invalid) {
        this.formAlta.markAllAsTouched();
        console.log('invalid form');
        return;
      } else {
        await this.alta();
      }

      setTimeout(() => {
        this.goTo('login');
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
    control = this.formAlta.get(field);

    return (control?.errors && control?.touched) || null;
  }

  getFieldError(field: string): string | null {
    let control = null;
    control = this.formAlta.get(field);
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
        case 'noCoincide':
          return 'La contraseña no coincide con la anterior';
      }
    }
    return null;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
