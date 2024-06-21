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
import { Supervisor } from 'src/app/classes/supervisor';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import Swal from 'sweetalert2';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-supervisor',
  templateUrl: './formulario-supervisor.component.html',
  styleUrls: ['./formulario-supervisor.component.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, FormsModule, ReactiveFormsModule],
})
export class FormularioSupervisorComponent implements OnInit {
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

  constructor(private supervisorService: SupervisorService) {
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
  private getSupervisor() {
    let supervisor = new Supervisor();
    supervisor.setNombre(this.nombre.value);
    supervisor.setApellido(this.apellido.value);
    supervisor.setDni(this.dni.value);
    supervisor.setCuil(this.cuil.value);
    supervisor.setFile(this.foto.value);
    supervisor.setCorreo(this.correo.value);
    supervisor.setClave(this.clave.value);
    return supervisor;
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
      const supervisor = this.getSupervisor();
      supervisor.file = this.foto.value; // Pasa todo el objeto foto
      await this.supervisorService.alta(supervisor);
      console.log(supervisor);
      await Swalert.toastSuccess('Registrado exitosamente');
      this.limpiar();
    } catch (error: any) {
      console.error('Error al registrar:', error);

      if (error && error.code === 'auth/email-already-in-use') {
        console.log('Error al registrar usuario:', error);
        this.mensaje = 'Ese correo ya está registrado';
      } else {
        this.mensaje = 'Error al registrar usuario';
      }
    }
  }
  public limpiar() {
    this.mensaje = '';
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
