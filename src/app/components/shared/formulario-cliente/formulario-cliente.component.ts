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
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
<<<<<<< HEAD
=======
import { TraductorQr } from 'src/app/classes/utils/traductor-qr';
<<<<<<< HEAD
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
=======
import { ApiService } from 'src/app/services/api/api.service';
import { BarcodeScanningService } from 'src/app/services/utils/barcode-scanning.service';
import { Estado } from 'src/app/classes/utils/enumerado';
>>>>>>> master

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [IonButton, IonIcon, IonContent, ReactiveFormsModule, CommonModule, QrScannerComponent, CapitalizePipe, JsonPipe]
})
export class FormularioClienteComponent implements OnInit {

=======
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    ReactiveFormsModule,
    CommonModule,
    CapitalizePipe,
    JsonPipe,
  ],
})
export class FormularioClienteComponent implements OnInit {
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
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

  constructor(private clienteService: ClienteService) {
    
=======
  }

  get apellido() {
    if (this.modoAlta) {
      return this.formAlta.get('apellido') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('apellido') as FormControl;
    }
    return this.formBaja.get('apellido') as FormControl;
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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

  constructor(
    private clienteService: ClienteService,
    private barcodeScanningService: BarcodeScanningService
  ) {}

  private crearFormGroup() {
    if (this.modoAlta) {
      this.formAlta = new FormGroup({
<<<<<<< HEAD
        nombre: new FormControl('', 
        [ 
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra()
        ]),
        apellido: new FormControl('', 
        [ 
=======
        nombre: new FormControl('', [
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
<<<<<<< HEAD
        dni: new FormControl(0, 
        [
=======
        apellido: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.validarPalabra(),
        ]),
        dni: new FormControl(0, [
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
        foto: new FormControl(undefined, [Validators.required]),
<<<<<<< HEAD
        correo: new FormControl('', 
        [ 
=======
        correo: new FormControl('', [
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
          Validators.required,
          Validators.email,
          Validators.required,
        ]),
<<<<<<< HEAD
        clave: new FormControl('', 
        [
=======
        clave: new FormControl('', [
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else if (this.modoModificar) {
      this.formModificar = new FormGroup({
        id: new FormControl(0, []),
<<<<<<< HEAD
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        dni: new FormControl(0, [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99999999),
        ]),
        foto: new FormControl(undefined, [Validators.required]),
=======
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
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
        foto: new FormControl(undefined, [Validators.required]),
=======
        foto: new FormControl(undefined),
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
    
=======
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
<<<<<<< HEAD
    if(this.foto.value !== null){
      cliente.setFile(this.foto.value);
    }else{
      throw new Error('errorfoto');
    }
    
    console.log(this.foto.value)
    if ((this.modoModificar || this.modoBaja) && this.cliente !== undefined) {
      cliente.setUrlFoto(this.cliente.foto);
      console.log(this.cliente.foto)
=======
=======
    cliente.estado = Estado.aceptado;
>>>>>>> master
    if (this.foto.value !== null) {
      cliente.setFile(this.foto.value);
    } else {
      throw new Error('errorfoto');
    }

    console.log(this.foto.value);
    if ((this.modoModificar || this.modoBaja) && this.cliente !== undefined) {
      cliente.setUrlFoto(this.cliente.foto);
      console.log(this.cliente.foto);
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
          console.log("invalid form");
=======
          console.log('invalid form');
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
          return;
        } else {
          await this.alta();
        }
      } else if (this.modoModificar) {
        if (this.formModificar.invalid) {
          this.formModificar.markAllAsTouched();
<<<<<<< HEAD
          console.log("invalid form");
          return;
        } else{
=======
          console.log('invalid form');
          return;
        } else {
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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

<<<<<<< HEAD
      switch(e.code){
        case 'auth/email-already-in-use':
          e.message = "El email esta en uso";
          break;
        case 'auth/invalid-email':
          e.message = "Introduzca un email valido";
          break;
        case 'auth/missing-password':
          e.message = "Introduzca una contraseña por favor";
          break;
        default:
          e.message = "Por favor ingrese bien sus datos";
          break;
      } 
=======
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
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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

<<<<<<< HEAD
  public recibirDataDniCuilQR($event: string) {
<<<<<<< HEAD
    this.nombre.setValue($event);
=======
    const source = TraductorQr.DniEjemplarA($event);
=======
  public async escanearDniCuil() {
    const dataQr = await this.barcodeScanningService.escanearQr();
    const source = TraductorQr.DniEjemplarA(dataQr);
>>>>>>> master
    this.dni.setValue(source.dni);
    this.dni.markAsDirty();
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
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
<<<<<<< HEAD
    if(this.modoAlta){
=======
    if (this.modoAlta) {
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

<<<<<<< HEAD
    return control?.errors && control?.touched || null;
=======
    return (control?.errors && control?.touched) || null;
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
  }

  getFieldError(field: string): string | null {
    let control = null;
<<<<<<< HEAD
    if(this.modoAlta){
=======
    if (this.modoAlta) {
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

    if (!control || !control.errors) return null;

    const errors = control.errors;
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
<<<<<<< HEAD
          return "Este campo es requerido";
=======
          return 'Este campo es requerido';
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errors['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errors['max'].max}.`;
        case 'pattern':
<<<<<<< HEAD
          return "Formato inválido";
        case 'email':
          return "Email invalido";
=======
          return 'Formato inválido';
        case 'email':
          return 'Email invalido';
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
      }
    }
    return null;
  }
<<<<<<< HEAD

}
=======
}
>>>>>>> 090c43b3d48424486267e8062d141e5a7cbdbe3b
