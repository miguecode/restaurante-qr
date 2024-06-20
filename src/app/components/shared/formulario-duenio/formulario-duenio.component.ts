import { Component, OnInit } from '@angular/core';
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
import { Duenio } from 'src/app/classes/duenio';
import { DuenioService } from 'src/app/services/duenio.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import Swal from 'sweetalert2';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-duenio',
  templateUrl: './formulario-duenio.component.html',
  styleUrls: ['./formulario-duenio.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, FormsModule, ReactiveFormsModule],
})
export class FormularioDuenioComponent implements OnInit {
  formRegistrar!: FormGroup;
  mensaje: string = 'Recordá completar todos los campos correctamente.';

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

  constructor(private duenioService: DuenioService) {
    this.crearFormGroup();
  }

  private crearFormGroup() {
    this.formRegistrar = new FormGroup({
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
  }
  private getDuenio() {
    let duenio = new Duenio();
    duenio.setNombre(this.nombre.value);
    duenio.setApellido(this.apellido.value);
    duenio.setDni(this.dni.value);
    duenio.setCuil(this.cuil.value);
    duenio.setFile(this.foto.value);
    duenio.setCorreo(this.correo.value);
    duenio.setClave(this.clave.value);
    return duenio;
  }

  public ngOnInit() {
    console.log('');
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Dueño',
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
      const duenio = this.getDuenio();
      duenio.file = this.foto.value; // Pasa todo el objeto foto
      await this.duenioService.alta(duenio);
      console.log(duenio);
      await Swalert.toastSuccess('Registrado exitosamente');
      this.limpiar();
    } catch (error: any) {
      console.error('Error al registrar:', error);

      if (error && error.code === 'auth/email-already-in-use') {
        console.log('Error al registrar usuario:', error);
      } else {
        this.mensaje = 'Error al registrar usuario';
      }
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
